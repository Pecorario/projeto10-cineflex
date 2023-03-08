import styled from 'styled-components';

export default function FooterSessions({ movie }) {
  console.log(movie);
  return (
    <FooterContainer>
      <div>
        <img src={movie.posterURL} alt="Poster do filme " />
      </div>
      <div>
        <p>{movie.title}</p>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 0;

    p {
      text-align: left;
    }
  }
`;
