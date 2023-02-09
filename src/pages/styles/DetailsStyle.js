import styled from "styled-components";


export const DetailsContainer = styled.div`
background-image: url(${props=>props.img});
background-repeat: no-repeat;
background-size: cover;
background-position: center;
`

export const FogDisplay = styled.div`
display: flex;
flex-direction: column;
background-color: rgba(0, 0, 0, 0.950);
height: 100%;
`

export const HeaderDetails = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 10vh;


h1{
    color: white;
    margin: 0px;
}
`

export const SectionDetails = styled.div`
gap: 5px;
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr;

max-height: 90vh;
`

export const Banner = styled.div`
grid-column-start: 1;
grid-column-end: 2;
display: flex;
justify-content: space-between;
align-items: center;
height: 380px;
padding: 20px;

img{
 height: 100%;
 border-radius: 5px;
}
`

export const Trailer = styled.div`
grid-column-start: 2;
grid-column-end: 3;
display: flex;
justify-content: center;
align-items: center;
height: 380pxpx;
padding-top: 20px;
padding-bottom: 20px;

iframe{
    border: none;
    margin: 20px;
}
`

export const Info = styled.div`
color: white;
grid-column-start: 1;
grid-column-end: 3;
grid-row-start: 2;
grid-row-end: 2;
`

export const Description = styled.div`
grid-column-start: 1;
grid-column-end: 3;
grid-row-start: 3;
grid-row-end: 3;
text-align: left;
color: white;
margin-left: 20px;
align-self: flex-start;
`

export const FooterDetails = styled.div`
height: 150px;
background-color: green;
`