import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import Favoritos from "../src/components/Favoritos";
import { videoService } from "../src/Services/VideoService.js";


function HomePage() {
  const service = videoService()
  const [valorDoFiltro, setValorDoFiltro] = React.useState("")
  const [playlists, setPlaylists] = React.useState({})

  React.useEffect(() => {
    service
    .getAllVideos()
    .then((dados) => {
      console.log(dados.data);
      const novasPlaylists = {}
      dados.data.forEach((video) => {
        if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = []
        novasPlaylists[video.playlist] = [
          video, 
          ...novasPlaylists[video.playlist],
        ]
      })
      setPlaylists(novasPlaylists)
    })
  }, [])
 

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Menu valorDoFiltro = {valorDoFiltro} setValorDoFiltro = {setValorDoFiltro} />
        <Header />
        <Timeline searchValue = {valorDoFiltro} playlists= {playlists} />
        <Favoritos />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
.user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div `
  background-image: url(${config.banner});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 230px;
`;

function Header() {
  return (
    <StyledHeader>
    <StyledBanner />
      <section className="user-info">
        <img src={`https://www.github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({searchValue, ...props}) {
  const playlistsNames = Object.keys(props.playlists);

  return (
    <StyledTimeline>
      {playlistsNames.map((playlistsName) => {
        const videos = props.playlists[playlistsName];
        return (
          <section key={playlistsName}>
            <h2>{playlistsName}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase()
                const searchValueNormalized = searchValue.toLowerCase()
                return titleNormalized.includes(searchValueNormalized)
              }).map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>{video.title}</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
