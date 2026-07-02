import styled from "styled-components";

export const BookWrapper = styled.div`
  .book {
    float: right;
    padding: 20px;
    text-align: center;
    @media only screen and (max-width: 568px) {
      float: inherit;
    }

    .two-buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }
  }
  div.center {
    text-align: center;
    margin: 1rem 0rem;
  }
  .card {
    position: relative;
    margin: 0.5rem 0 1rem 0;
    -webkit-transition: -webkit-box-shadow 0.25s;
    transition: -webkit-box-shadow 0.25s;
    transition: box-shadow 0.25s;
    transition:
      box-shadow 0.25s,
      -webkit-box-shadow 0.25s;
    border-radius: 2px;
  }

  .mr-l-25 {
    margin-left: 25px;
  }

  .mr-l-15 {
    margin-left: 15px;
  }

  .pa-8 {
    padding: 8px;
  }

  .mr-2 {
    margin: 2px;
  }

  @media (min-width: 655px) {
    .spacer {
      margin-bottom: 5rem;
    }
  }

  @media (min-width: 732px) {
    .spacer {
      margin-bottom: 8rem;
    }
  }

  @media (min-width: 744px) {
    .spacer {
      margin-bottom: 11rem;
    }
  }

  @media (min-width: 992px) {
    .spacer {
      margin-bottom: 20rem;
    }
  }
`;
