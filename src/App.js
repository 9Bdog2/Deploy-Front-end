import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Edit from "./pages/Edit";
import Gallery from "./pages/Gallery";
import "./App.css";
import { dataURLtoFile } from "./utils/image";
import { createRef, useEffect, useState } from "react";
function App() {
  const editor = createRef();
  const fileInput = createRef();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/images");
      if (response.ok) {
        const imagesArray = await response.json();
        setImages(imagesArray);
        console.log(imagesArray);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (editor.current) {
      console.log(editor);
    }
  }, [editor]);

  const onSave = async (id, callback) => {
    const base64 = editor.current.imageEditorInst.toDataURL();
    const file = dataURLtoFile(base64, "image.png");
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(`http://localhost:5000/images/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        console.log("image is updated");
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("http://localhost:5000/images", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        fetchImages();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onUplaod = () => {
    fileInput.current.click();
  };
  return (
    <div className="App">
      <Router>
        <NavBar onUpload={onUplaod} onSave={onSave} />
        <input
          onChange={onChange}
          ref={fileInput}
          type="file"
          accept="image/png"
          hidden
        />
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Gallery images={images} loading={loading} />}
          />
          <Route
            path="/edit/:id"
            exact
            render={(props) => <Edit {...props} ref={editor} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
