import styled from 'styled-components'

const StyledParentContainer = styled.div`
  background-color: #e4ebf6;
  //box-shadow: 10px 10px 20px #878c91, -10px -10px 20px #ffffff;
  box-shadow: 10px 10px 20px #3c358c, -5px -5px 20px #9e8bff;
  min-height: 80vh;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 0rem;
  border: none;
  border-radius: 32px;

  @media (min-width: 425px) {
    //box-shadow: 20px 20px 40px #878c91, -20px -20px 40px #ffffff;
    box-shadow: 20px 20px 40px #3c358c, -10px -10px 40px #9e8bff;
  }
  @media (min-width: 800px) {
    //box-shadow: 60px 60px 120px #a0a5ac, -60px -60px 120px #ffffff;
    box-shadow: 60px 60px 120px #3c358c, -30px -30px 120px #9e8bff;
  }
`;

export default StyledParentContainer