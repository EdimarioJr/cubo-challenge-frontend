import styled,{createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body{
            height: 100%;
            font-family: 'Ubuntu', sans-serif;
            font-size: 16px;
        }
`
export const Container = styled.div`
    width: 70%;
    margin: 0 auto;
`
