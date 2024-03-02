import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

var imageURL;

function Form(props) {
    const [file, setFile] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        const fileList = event.target.files;
        if (fileList) {
            imageURL = URL.createObjectURL(fileList[0]);
            setFile(imageURL);
            console.log(imageURL);
        }
    };

    const handleForm = (event) => {
        event.preventDefault();

        axios
            .post(
                "http://localhost:5000",
                { file },
                {
                    headers: {
                        "Content-Type": file.type,
                    },
                }
            )
            .then((response) => {
                console.log("axios.post then function is called");
                console.log(response.data);
                const imageFile = response.data;
                console.log("server responded");
                navigate("/calculate", { state: { imageFile: imageFile } });
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("response error");
                } else if (error.request) {
                    console.log("network error");
                } else {
                    console.log(error);
                }
            });
    };

    const handleImageLoad = (event) => {
        setIsLoaded(true);
    };

    return (
        <div className="form">
            <form onSubmit={handleForm}>
                <input
                    type="file"
                    name="imageFile"
                    id="selected-image"
                    accept="image/*" // only accept image files
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                <label className="label" for="selected-image">
                    Select image
                </label>
                <button className="calculate-btn" type="submit">
                    Calculate
                </button>
            </form>

            <img
                src={file}
                alt=""
                onLoad={handleImageLoad}
                className={isLoaded ? "preview-img" : " "}
                onError={(e) => (e.target.src = "")}
            />
        </div>
    );
}

export default Form;
// export { imageURL };
