import styled from "styled-components";

export const DatePickerWrapper = styled.div`
  .rmdp-calendar * {
    font-size: 13px;
    font-weight: 500;
  }

  .rmdp-calendar-container-mobile .rmdp-wrapper {
    * {
      font-size: 14px;
    }

    width: 100%;
    max-width: 320px;

    .rmdp-header {
      margin-bottom: 12px;
    }

    .rmdp-calendar,
    .rmdp-day-picker > div {
      width: 100%;
    }
  }
`;
