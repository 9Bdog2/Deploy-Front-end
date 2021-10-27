import ImageEditor from "@toast-ui/react-image-editor";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import "tui-image-editor/dist/tui-image-editor.css";
import Loader from "../components/loader/Loader";
const Editor = React.forwardRef((props, ref) => {
  const params = useParams();
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const fetchImageById = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/images/${params.id}`);
      if (response.ok) {
        const image = await response.json();
        setImage(image.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImageById();
  }, [params.id]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <ImageEditor
        ref={ref}
        includeUI={{
          loadImage: {
            path: loading ? "/lake.jpg" : image,
            name: "Lake",
          },

          uiSize: {
            height: "100vh",
          },

          menuBarPosition: "left",
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
      />
    );
  }
});

export default Editor;
