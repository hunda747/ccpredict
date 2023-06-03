export default function handler(req, res) {
  console.log("api_______");
  if (req.method !== "POST") {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const formData = new FormData();
  formData.append("image", req.body);

  fetch("http://localhost:5000/predict", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).end(); // Internal Server Error
    });
}
