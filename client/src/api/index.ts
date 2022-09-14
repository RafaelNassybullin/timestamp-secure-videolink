export const getExpiredLink = async (id: string) => {
  const videoRes = await fetch(
    `${process.env.REACT_APP_API}/getVideoId/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const videoData = await videoRes.json();
  const linkResponce = await fetch(
    `${process.env.REACT_APP_API}/generateTimeLink?dataid=${videoData._id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const linkData = await linkResponce.json();
  return linkData.link
}

export const getAllData = async () => {
  const responce = await fetch(
    `${process.env.REACT_APP_API}/getaAllVideos`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const videoData = await responce.json();
  return videoData
};

export const clearExpiredLinks = async () => {
  const responce = await fetch(
    `${process.env.REACT_APP_API}/deletelink`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await responce.json();
  return data
};