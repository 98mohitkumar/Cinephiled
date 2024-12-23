import styled from "styled-components";

import { theme } from "theme/theme";

export const ToastWrapper = styled.div`
  padding: 15px 34px;
  background-color: #ebebeb;
  color: ${theme.colors.black};
  position: fixed;
  inset: 0;
  top: auto;
  margin: auto;
  max-width: fit-content;
  width: fit-content;
  border-radius: 45px;
  z-index: 1000;
  display: grid;
  place-items: center;
  box-shadow:
    0px 0px 5rem 50rem hsla(0, 0%, 0%, 0.14),
    0px 0px 100px 100px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
  font-weight: 500;
`;
