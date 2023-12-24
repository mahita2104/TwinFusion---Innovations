import { useState, ChangeEvent, FormEvent } from "react";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // You can perform actions with the feedback, name, and email data here
    // For now, let's just mark it as submitted
    setSubmitted(true);
  };

  return (
    <div
      className="feedback-container"
      style={{ background: "#616060", padding: "20px" }}
    >
      <h1 style={{ color: "white" }}>Contact Us</h1>
      {submitted ? (
        <div>
          <p>Thank you for your feedback!</p>
          <p>You submitted the following feedback:</p>
          <p>{feedback}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label"
              style={{ color: "#e5510d" }}
            >
              Your Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
              style={{ background: "#616060", color: "white" }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{ color: "#e5510d" }}
            >
              Your Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              style={{ background: "#616060", color: "white" }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="feedback"
              className="form-label"
              style={{ color: "#e5510d" }}
            >
              Your Feedback
            </label>
            <textarea
              className="form-control"
              id="feedback"
              rows={4}
              value={feedback}
              onChange={handleFeedbackChange}
              required
              style={{ background: "#616060", color: "white" }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ background: "#e5510d", color: "white" }}
          >
            <i className="fas fa-paper-plane"></i> Submit Feedback
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              background: "#e5510d",
              color: "white",
              marginLeft: "10px",
            }}
          >
            <i className="fas fa-envelope"></i> Contact Us via Email
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              background: "#e5510d",
              color: "white",
              marginLeft: "10px",
            }}
          >
            <i className="fas fa-phone"></i> Contact Us via Phone
          </button>
        </form>
      )}
    </div>
  );
}

export default Feedback;
