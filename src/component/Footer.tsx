import styled from 'styled-components';

const FooterContainer = styled.div`
    text-align: center;
    font-size: 14px;
    padding: 0px 0 24px 0;
    color: var(--text);
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>©2022 Hanameee Corp. All rights reserved.</p>
            <p>©2023 Badahertz52</p>
        </FooterContainer>
    );
};

export default Footer;
