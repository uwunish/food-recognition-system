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
        <div className="calculate-main-div">
            <div className="column calculate-img-div">
                <h2>Image</h2>
                <img height={200} width={200} src={imageFile.data} alt="" />
            </div>
            {/* Display nutritional information and bounding boxes */}
            <div className="column calculate-nutrition-div">
                <h2>Nutritional Information</h2>
                <label>Calorie: </label>
                <span>some calorie value</span>
                <br />
                <label>Carbohydrate: </label>
                <span>some carbs</span>
                <br />
                <label>Protein: </label>
                <span>some protein</span>
                <br />
                <label>Fat: </label>
                <span>some fat</span>
            </div>
        </div>
    );
}

export default Calculate;
