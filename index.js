const canvas = new fabric.Canvas("canvas", {
  width: 500,
  height: 500,
  backgroundColor: "white",
});

const imageAdded = (e) => {
  console.log(e);
  const inputElement = document.getElementById("myImg");
  const file = inputElement.files[0];
  reader.readAsDataURL(file);
};

const inputFile = document.getElementById("myImg");
inputFile.addEventListener("change", imageAdded);
const reader = new FileReader();

reader.addEventListener("load", () => {
  console.log(reader.result);
  fabric.Image.fromURL(reader.result, (img) => {
    canvas.add(img);
    img.center();
    img.centerH();
    img.centerV();

    canvas.requestRenderAll();
  });
});

canvas.on("mouse:wheel", function (opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();

  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
  
  var vpt = this.viewportTransform;
  if (zoom < 400 / 500) {
    vpt[4] = 200 - (500 * zoom) / 2;
    vpt[5] = 200 - (500 * zoom) / 2;
  } else {
    if (vpt[4] >= 0) {
      vpt[4] = 0;
    } else if (vpt[4] < canvas.getWidth() - 500 * zoom) {
      vpt[4] = canvas.getWidth() - 500 * zoom;
    }
    if (vpt[5] >= 0) {
      vpt[5] = 0;
    } else if (vpt[5] < canvas.getHeight() - 500 * zoom) {
      vpt[5] = canvas.getHeight() - 500 * zoom;
    }
  }

  //   zoom = zoom + delta / 800;
  //   if (zoom > 20) zoom = 20;
  //   if (zoom < 0.01) zoom = 0.01;
  //   canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  //   opt.e.preventDefault();
  //   opt.e.stopPropagation();
});

canvas.renderAll();
