import React from "react";
import { useLocation } from "react-router-dom";

// import { imageURL } from "./Form";

function Calculate() {
    // Fetch and display nutritional information and bounding boxes here
    // app.post("/calculate", (req, res) => {
    //     res.send("Post request called");
    // });
    const { state } = useLocation();
    const { imageFile } = state;
    console.log(state);
    console.log(imageFile);
    console.log(imageFile.data);
    return (
        <div>
            <h2>Image</h2>
            <img height={200} width={200} src={imageFile.data} alt="" />
            {/* Display nutritional information and bounding boxes */}
            <h2>Nutritional Information</h2>
            <h4>Calorie</h4>
            <p>some calorie value</p>
            <h4>Carbohydrate</h4>
            <p>some carbs</p>
            <h4>Protein</h4>
            <p>some protein</p>
            <h4>Fat</h4>
            <p>some fat</p>
        </div>
    );
}

export default Calculate;
