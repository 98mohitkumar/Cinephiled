import { getRuntime } from "./helper";

const getFormattedTechnicalDetails = (apiResponse) => {
  const items = [];

  if (!apiResponse) return items;

  // Runtime
  if (apiResponse.runtimes?.edges?.length > 0) {
    items.push({
      id: "runtime",
      rowTitle: "Runtime",
      listContent: apiResponse.runtimes.edges.map((edge) => {
        const runtime = edge.node;
        return {
          text: runtime.displayableProperty?.value?.plainText || getRuntime(runtime.seconds / 60),
          subText: runtime.attributes?.length > 0 ? `(${runtime.attributes.map((attr) => attr.text).join(", ")})` : null
        };
      })
    });
  }

  const techSpecs = apiResponse.technicalSpecifications;
  if (!techSpecs) return items;

  // Aspect Ratios
  if (techSpecs.aspectRatios?.items?.length > 0) {
    items.push({
      id: "aspectRatios",
      rowTitle: "Aspect Ratio",
      listContent: techSpecs.aspectRatios.items.map((item) => ({
        text: item.aspectRatio,
        subText: item.attributes?.length > 0 ? `(${item.attributes.map((attr) => attr.text).join(", ")})` : null
      }))
    });
  }

  // Cameras
  if (techSpecs.cameras?.items?.length > 0) {
    items.push({
      id: "cameras",
      rowTitle: "Camera",
      listContent: techSpecs.cameras.items.map((item) => ({
        text: item.camera,
        subText: item.attributes?.length > 0 ? `(${item.attributes.map((attr) => attr.text).join(", ")})` : null
      }))
    });
  }

  // Color
  if (techSpecs.colorations?.items?.length > 0) {
    items.push({
      id: "colorations",
      rowTitle: "Color",
      listContent: techSpecs.colorations.items.map((item) => ({
        text: item.text,
        subText: item.attributes?.length > 0 ? `(${item.attributes.map((attr) => attr.text).join(", ")})` : null
      }))
    });
  }

  // Film Length
  if (techSpecs.filmLengths?.items?.length > 0) {
    items.push({
      id: "filmLengths",
      rowTitle: "Film Length",
      listContent: techSpecs.filmLengths.items.map((item) => ({
        text: item.displayableProperty?.value?.plainText || "N/A",
        subText: item.countries?.length > 0 ? `(${item.countries.map((country) => country.text).join(", ")})` : null
      }))
    });
  }

  // Laboratory
  if (techSpecs.laboratories?.items?.length > 0) {
    items.push({
      id: "laboratories",
      rowTitle: "Laboratory",
      listContent: techSpecs.laboratories.items.map((item) => ({
        text: item.laboratory,
        subText: item.attributes?.length > 0 ? `(${item.attributes.map((attr) => attr.text).join(", ")})` : null
      }))
    });
  }

  // Negative Format
  if (techSpecs.negativeFormats?.items?.length > 0) {
    items.push({
      id: "negativeFormats",
      rowTitle: "Negative Format",
      listContent: techSpecs.negativeFormats.items.map((item) => ({
        text: item.negativeFormat,
        subText: item.attributes?.length > 0 ? `(${item.attributes.map((attr) => attr.text).join(", ")})` : null
      }))
    });
  }

  // Printed Format
  if (techSpecs.printedFormats?.items?.length > 0) {
    items.push({
      id: "printedFormats",
      rowTitle: "Printed Format",
      listContent: techSpecs.printedFormats.items.map((item) => ({
        text: item.printedFormat,
        subText: item.attributes?.length > 0 ? `(${item.attributes.map((attr) => attr.text).join(", ")})` : null
      }))
    });
  }

  // Process
  if (techSpecs.processes?.items?.length > 0) {
    items.push({
      id: "processes",
      rowTitle: "Process",
      listContent: techSpecs.processes.items.map((item) => ({
        text: item.process,
        subText: item.attributes?.length > 0 ? `(${item.attributes.map((attr) => attr.text).join(", ")})` : null
      }))
    });
  }

  // Sound Mix
  if (techSpecs.soundMixes?.items?.length > 0) {
    items.push({
      id: "soundMixes",
      rowTitle: "Sound Mix",
      listContent: techSpecs.soundMixes.items.map((item) => ({
        text: item.text,
        subText: item.attributes?.length > 0 ? `(${item.attributes.map((attr) => attr.text).join(", ")})` : null
      }))
    });
  }

  return items;
};

export default getFormattedTechnicalDetails;
