import React, { useEffect, useState } from "react";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Video from "./Video";
import data from "../data";

export default function Sample() {
  const storage = getStorage();
  const [urls, setUrls] = useState([]);

  const getAllUrls = async () => {
    const urlList = [];
    for (const quality of data.song1.quality) {
      const storageRef = ref(
        storage,
        `Ed Sheeran - Perfect (Official Music Video) - ${quality}.mp4`
      );
      const url = await getDownloadURL(storageRef);
      const d = {
        quality: quality,
        url: url,
      };
      urlList.push(d);
    }
    setUrls(urlList);
  };

  useEffect(() => {
    getAllUrls();
  }, []);

  return <div>{urls.length > 0 && <Video urls={urls} />}</div>;
}
