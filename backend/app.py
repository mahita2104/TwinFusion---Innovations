from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import tensorflow as tf
import joblib
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from fastapi.templating import Jinja2Templates
from typing import List, Dict, Union
import numpy as np
import plotly.express as px
from fastapi.responses import HTMLResponse
import plotly.graph_objs as go
from fastapi import Form
app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing) to allow requests from different origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to a specific list of origins
    allow_methods=["*"],
    allow_headers=["*"],
)

#model_path = '/home/mahita/Desktop/python/plant1_anomaly_detection/'
#load_options = tf.saved_model.LoadOptions(experimental_io_device='/job:localhost')
#model1 = tf.saved_model.load(model_path, options=load_options)
model1 = tf.saved_model.load('/home/mahita/Desktop/python/plant1_anomaly_detection/')

model2 = tf.saved_model.load('/home/mahita/Desktop/python/plant2_anomaly_detection/')

# Load your pickle models
prophet_model1 = joblib.load('/home/mahita/Desktop/python/prophet_model1.pkl')
prophet_model2 = joblib.load('/home/mahita/Desktop/python/prophet_model2.pkl')

def preprocess_and_scale_data(inverter_data,scaler):
   inverter_data_array= inverter_data.to_numpy()
   scaler.fit(inverter_data_array)
   X_train = scaler.transform(inverter_data_array)
   X_train = X_train.reshape(X_train.shape[0], 1, X_train.shape[1])
   return X_train

scaler = MinMaxScaler()
#scaler.fit(your_training_data) 
# Define a route to detect anomalies for a specific inverter ID
@app.get("/plant1_anomaly")
async def home(request: Request):
    return HTMLResponse(content=open("index.html").read(), status_code=200)
# @app.get("/detect_anomalies_plant1/{inverter_id}")
# async def detect_anomalies_plant1(inverter_id: str):
@app.get("/detect_anomalies_plant1")
async def detect_anomalies_plant1(request: Request, inverter_id: str):
    try:
        # Fetch the data associated with the given inverter_id
        plant1_generation_data=pd.read_csv('/home/mahita/Desktop/python/Plant_1_Generation_Data.csv')
        plant1_weather_sensor_data = pd.read_csv('/home/mahita/Desktop/python/Plant_1_Weather_Sensor_Data.csv')
        plant1_generation_data['DATE_TIME'] = pd.to_datetime(plant1_generation_data['DATE_TIME'], dayfirst=True)
        plant1_weather_sensor_data['DATE_TIME'] = pd.to_datetime(plant1_weather_sensor_data['DATE_TIME'], dayfirst=True)
        p1_i1_generation_data = plant1_generation_data[plant1_generation_data['SOURCE_KEY'] == inverter_id]
        mask = ((plant1_weather_sensor_data['DATE_TIME'] >= min(p1_i1_generation_data["DATE_TIME"])) & (plant1_weather_sensor_data['DATE_TIME'] <= max(p1_i1_generation_data["DATE_TIME"])))
        weather_filtered = plant1_weather_sensor_data.loc[mask]
        inverter_data= p1_i1_generation_data.merge(weather_filtered, on="DATE_TIME", how='left')
        inverter_data_time = inverter_data[['DATE_TIME']]
        inverter_data=inverter_data[['AC_POWER',
                             'AMBIENT_TEMPERATURE', 'MODULE_TEMPERATURE', 'IRRADIATION']]

        if inverter_data is None:
            raise HTTPException(status_code=404, detail="Inverter ID not found")

        # Get the signature for serving_default
        signature = model1.signatures['serving_default']

        # Load your entire preprocessed data (replace with your actual data loading code)
        preprocessed_data = preprocess_and_scale_data(inverter_data,scaler)  # Make sure it has shape (batch_size, 1, 4)

       # Perform inference using the signature
        output = signature(input_1=preprocessed_data)['time_distributed']
        X_pred=np.array(output)

        #X_pred = model1.predict(X_test)
        X_pred = X_pred.reshape(X_pred.shape[0], X_pred.shape[2])

        # Inverse transform the predictions using the same scaler
        X_pred = scaler.inverse_transform(X_pred)

        # Calculate the Mean Absolute Error (MAE) between real AC power and predicted AC power
        scores = pd.DataFrame(X_pred, columns=inverter_data.columns)
        scores['real AC'] = inverter_data['AC_POWER']
        scores["loss_mae"] = (scores['real AC'] - scores['AC_POWER']).abs()
        scores["datetime"]=inverter_data_time

        # Set a threshold for anomaly detection (you can adjust this threshold)
        threshold = 200
        #scores['datetime']=inverter_data['DATE_TIME']
        scores['Threshold']=threshold
        # Classify data points as anomalies if MAE exceeds the threshold
        scores['Anomaly'] = np.where(scores["loss_mae"] > threshold, 1, 0)
        anomalies = scores[scores['Anomaly'] == 1][['real AC']]
        anomalies = anomalies.rename(columns={'real AC': 'anomalies'})
        scores = scores.merge(anomalies, left_index=True, right_index=True, how='left')
        #plotting a graph
        fig = go.Figure()

        fig.add_trace(go.Scatter(x=scores["datetime"], y=scores["real AC"],
                                 mode='lines',
                                 name='AC Power'))

        fig.add_trace(go.Scatter(x=scores["datetime"], y=scores["anomalies"],
                                 name='Anomaly',
                                 mode='markers',
                                 marker=dict(size=11,
                                             line=dict(width=2))))

        # Update the layout of the graph
        fig.update_layout(
            autosize=True,
            title="Anomalies Detected LSTM Autoencoder",
            xaxis_title='Timestamp',
            xaxis=dict(tickangle=-45),
            yaxis=dict(title='AC Power(kW)'),
            legend=dict(x=0, y=1)
        )
        #fig = px.scatter(scores, x=scores.index, y='Anomaly', title='Anomaly Scores')
        graph_html = fig.to_html(full_html=False)
        # Create HTML response with the graph
        html_content = f"<html><body>{graph_html}</body></html>"
        return HTMLResponse(content=html_content)
        # Return the anomaly scores
        return {"inverter_id": inverter_id, "anomaly_scores": scores['Anomaly'].tolist(),"plotly_graph":graph_html}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/detect_anomalies_plant2/{inverter_id}")
async def detect_anomalies_plant2(inverter_id: str):
    try:
        # Fetch the data associated with the given inverter_id
        plant2_generation_data=pd.read_csv('/home/mahita/Desktop/python/Plant_2_Generation_Data.csv')
        plant2_weather_sensor_data = pd.read_csv('/home/mahita/Desktop/python/Plant_2_Weather_Sensor_Data.csv')
        plant2_generation_data['DATE_TIME'] = pd.to_datetime(plant2_generation_data['DATE_TIME'], dayfirst=True)
        plant2_weather_sensor_data['DATE_TIME'] = pd.to_datetime(plant2_weather_sensor_data['DATE_TIME'], dayfirst=True)
        p2_i2_generation_data = plant2_generation_data[plant2_generation_data['SOURCE_KEY'] == inverter_id]
        mask = ((plant2_weather_sensor_data['DATE_TIME'] >= min(p2_i2_generation_data["DATE_TIME"])) & (plant2_weather_sensor_data['DATE_TIME'] <= max(p2_i2_generation_data["DATE_TIME"])))
        weather_filtered = plant2_weather_sensor_data.loc[mask]
        inverter_data= p2_i2_generation_data.merge(weather_filtered, on="DATE_TIME", how='left')
        inverter_data_time = inverter_data[['DATE_TIME']]
        inverter_data=inverter_data[['AC_POWER',
                             'AMBIENT_TEMPERATURE', 'MODULE_TEMPERATURE', 'IRRADIATION']]

        if inverter_data is None:
            raise HTTPException(status_code=404, detail="Inverter ID not found")

        # Get the signature for serving_default
        signature = model2.signatures['serving_default']

        # Load your entire preprocessed data (replace with your actual data loading code)
        preprocessed_data = preprocess_and_scale_data(inverter_data,scaler)  # Make sure it has shape (batch_size, 1, 4)

       # Perform inference using the signature
        output = signature(input_1=preprocessed_data)['time_distributed']
        X_pred=np.array(output)

        #X_pred = model1.predict(X_test)
        X_pred = X_pred.reshape(X_pred.shape[0], X_pred.shape[2])

        # Inverse transform the predictions using the same scaler
        X_pred = scaler.inverse_transform(X_pred)

        # Calculate the Mean Absolute Error (MAE) between real AC power and predicted AC power
        scores = pd.DataFrame(X_pred, columns=inverter_data.columns)
        scores['real AC'] = inverter_data['AC_POWER']
        scores["loss_mae"] = (scores['real AC'] - scores['AC_POWER']).abs()
        scores["datetime"]=inverter_data_time

        # Set a threshold for anomaly detection (you can adjust this threshold)
        threshold = 720
        #scores['datetime']=inverter_data['DATE_TIME']
        scores['Threshold']=threshold
        # Classify data points as anomalies if MAE exceeds the threshold
        scores['Anomaly'] = np.where(scores["loss_mae"] > threshold, 1, 0)
        anomalies = scores[scores['Anomaly'] == 1][['real AC']]
        anomalies = anomalies.rename(columns={'real AC': 'anomalies'})
        scores = scores.merge(anomalies, left_index=True, right_index=True, how='left')
        #plotting a graph
        fig = go.Figure()

        fig.add_trace(go.Scatter(x=scores["datetime"], y=scores["real AC"],
                                 mode='lines',
                                 name='AC Power'))

        fig.add_trace(go.Scatter(x=scores["datetime"], y=scores["anomalies"],
                                 name='Anomaly',
                                 mode='markers',
                                 marker=dict(size=11,
                                             line=dict(width=2))))

        # Update the layout of the graph
        fig.update_layout(
            autosize=True,
            title="Anomalies Detected LSTM Autoencoder",
            xaxis_title='Timestamp',
            xaxis=dict(tickangle=-45),
            yaxis=dict(title='AC Power(kW)'),
            legend=dict(x=0, y=1)
        )
        #fig = px.scatter(scores, x=scores.index, y='Anomaly', title='Anomaly Scores')
        graph_html = fig.to_html(full_html=False)
        # Create HTML response with the graph
        html_content = f"<html><body>{graph_html}</body></html>"
        return HTMLResponse(content=html_content)
        # Return the anomaly scores
        return {"inverter_id": invesrter_id, "anomaly_scores": scores['Anomaly'].tolist(),"plotly_graph":graph_html}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



from pydantic import BaseModel

class ProphetInputData(BaseModel):
    data: List[Dict[str, Union[str, float]]]

# @app.post('/predict_prophet_model1')
# async def predict_prophet_model1(data: ProphetInputData):
#     input_data = pd.DataFrame(data.data)
#     future = prophet_model1.make_future_dataframe(periods=len(input_data))
#     forecast = prophet_model1.predict(future)
#     forecast_values = forecast[['ds', 'yhat']].tail(len(input_data)).to_dict(orient='records')
#     return {'forecast': forecast_values}
# from datetime import datetime
# import pandas as pd
templates = Jinja2Templates(directory="templates")
@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("predictor.html", {"request": request})

#@app.post("/predict/")
# @app.post('/predict_prophet_model1')
# async def predict_prophet_model1(datetime_input: str):
#     # Convert the input datetime string to a pandas datetime object
#     input_datetime = pd.to_datetime(datetime_input)
    
#     # Create a future dataframe with the input datetime
#     future = pd.DataFrame({'ds': [input_datetime]})
    
#     # Predict the AC power for the input datetime
#     forecast = prophet_model1.predict(future)
    
#     # Extract the predicted AC power (yhat) for the input datetime
#     predicted_power = forecast['yhat'].values[0]
#     #return templates.TemplateResponse("predictor.html", {"request": request, "predicted_yield": f'Predicted Daily Yield: {predicted_power:.2f}'})

#     return {'datetime': datetime_input, 'predicted_ac_power': predicted_power}
@app.post("/predict/")
async def predict(request: Request, datetime_input: str=Form(...),):
    # Convert the input datetime string to a pandas datetime object
    input_datetime = pd.to_datetime(datetime_input)
    
    # Create a future dataframe with the input datetime
    future = pd.DataFrame({'ds': [input_datetime]})
    
    # Predict the AC power for the input datetime
    forecast = prophet_model1.predict(future)
    
    # Extract the predicted AC power (yhat) for the input datetime
    predicted_power = forecast['yhat'].values[0]
    print(f"Predicted Power: {predicted_power}")
    return templates.TemplateResponse("predictor.html", {"request": request, "input_datetime": datetime_input, "predicted_yield": f'Predicted Daily Yield: {predicted_power:.2f}'})
    #return templates.TemplateResponse("predictor.html", {"request": request, "predicted_yield": f'Predicted Daily Yield: {predicted_power:.2f}'})

# @app.get("/")
# def read_root():
#     return {"Welcome": "to webapp"}
if __name__ == '__main__':
    uvicorn.run("app:app", host='0.0.0.0', port=5000,reload=True)
