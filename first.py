print('hello world')
#app.py's functions
#anomaly detection
# @app.post('/predict_model1')
# async def predict_model1(data: List[float]):
#     # Use model1 for prediction
#     prediction = model1.predict(data)
#     return {'prediction': prediction.tolist()}
#prophet model

# @app.post('/predict_prophet_model2')
# async def predict_prophet_model2(data: List[float]):
#     # Perform forecasting using the loaded Prophet model
#     future = prophet_model2.make_future_dataframe(periods=len(data))
#     forecast = prophet_model2.predict(future)
#     # Extract and return the forecasted values
#     forecast_values = forecast[['ds', 'yhat']].tail(len(data)).to_dict(orient='records')
#     return {'forecast': forecast_values}
