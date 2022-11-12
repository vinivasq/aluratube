import config from "../../config.json"
import styled from "styled-components"

const StyledFavoritos = styled.div `
    display: flex;
    flex-direction: column;
    padding: 16px;
    h2 {
        font-size: 16px;
        margin-bottom: 16px;
    }
    .favoritos{
        display: flex;
        gap: 8px;
    }
    div {
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 8px;
    }
    img {
        border-radius: 50%;
        height: 100px;
    }
    a {
        text-decoration: none;
        color: ${({ theme }) =>theme.textColorBase};   
    }
`

export default function Favoritos () {
    return (
        <StyledFavoritos>
            <h2>AluraTubes Favoritos</h2>
            <section className="favoritos">
                <div>
                    <img src={`https://www.github.com/${config.favoritos.user1github}.png`} />
                    <a href= "https://www.youtube.com/alura" target= "_blank"> {config.favoritos.user1} </a>
                </div>
                <div>
                    <img src={`https://www.github.com/${config.favoritos.user2github}.png`} />
                    <a href= "https://www.youtube.com/DevSoutinho" target= "_blank"> {config.favoritos.user2} </a>
                </div>
            </section>
        </StyledFavoritos>
    )
}