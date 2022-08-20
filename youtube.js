// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=kgf%202&key=[YOUR_API_KEY]

  // Google Api key====    AIzaSyDRQYETGsp_6DXklH1sTbf21nQLZg7BkbU

  const API = "AIzaSyDRQYETGsp_6DXklH1sTbf21nQLZg7BkbU";
  let show_videos = document.getElementById("show_videos");

  fetch(
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=IN&key=AIzaSyDRQYETGsp_6DXklH1sTbf21nQLZg7BkbU"
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(res);
      popular(res.items);
    })
    .catch(function (err) {
      console.log("err:", err);
    });

  const popular = (videos) => {
    let div = document.createElement("div");
    div.setAttribute("id", "div1");

    show_videos.innerHTML = null;

    videos.forEach(({ snippet: { title }, id }) => {
      let div2 = document.createElement("div");
      div2.setAttribute("class", "box2");

      let iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${id}`;
      // iframe.setAttribute("id","img")
      iframe.width = "100%";
      iframe.height = "75%";
      iframe.allow = "fullscreen";

      let name = document.createElement("h4");
      name.innerText = title;

      div2.append(iframe, name);

      div.append(div2);
      show_videos.append(div);
    });
  };

  const searchVideos = async () => {
    try {
      const q = document.getElementById("query").value;

      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${q}%202&key=${API}`
      );

      //    const  res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${q}%202&key=${API}`);

      const data = await res.json();
      append(data.items);
      console.log(data.items);
    } catch (err) {
      console.log("err:-", err);
    }
  };

  const append = (videos) => {
    let show_videos = document.getElementById("show_videos");
    show_videos.innerHTML = null;

    videos.forEach(
      ({
        snippet: { title },
        snippet: {
          thumbnails: {
            high: { url },
          },
        },
        id: { videoId },
        snippet: { description },
      }) => {
        let div = document.createElement("div");
        div.setAttribute("class", "box");

        let iframe = document.createElement("img");
        iframe.src = url;
        iframe.setAttribute("id", "img");
        // iframe.width = "100%";
        // iframe.height = "100%";
        // iframe.allow = "fullscreen";

        let namdes = document.createElement("div");

        let name = document.createElement("h3");
        name.innerText = title;

        let des = document.createElement("p");
        des.innerText = description;

        namdes.append(name, des);
        div.append(iframe, namdes);

        let data = {
          title,
          url,
          videoId,
        };

        div.onclick = () => {
          showVideo(data);
        };

        show_videos.append(div);
      }
    );
  };

  const showVideo = (x) => {
    window.location.href = "youtube2.html";
    localStorage.setItem("video", JSON.stringify(x));
  };