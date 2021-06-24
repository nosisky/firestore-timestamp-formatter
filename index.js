const transcode = (data) => {
  return (
    Object.keys(data).reduce <
    DocumentData >
    ((accumulator, key) => {
      if (data[key].constructor.name === "Timestamp") {
        accumulator[key] = data[key].toDate();
      } else if (Array.isArray(data[key])) {
        accumulator[key] = data[key].map(transcode);
      } else {
        accumulator[key] = data[key];
      }

      return accumulator;
    },
    {})
  );
};

const timestampConverter = {
  toFirestore(documentData) {
    return documentData;
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const transcodedData = transcode(data);

    return transcodedData;
  },
};

export default timestampConverter;
