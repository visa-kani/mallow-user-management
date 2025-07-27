import styled from "styled-components";

interface ButtonProps {
  btnMode?: string;
  btnSize?: string;
}

interface InputProps {
  IconPosition?: string;
  inputSize?: string;
}

export const ButtonComponent = styled.button<ButtonProps>`
  font-size: 16px;
  text-align: center;
  color: ${(props) =>
    props.btnMode === "primary" || props.btnMode === "danger"
      ? "#ffffff"
      : "#448ef7"};
  background: ${(props) =>
    props.btnMode === "primary"
      ? "#448ef7"
      : props.btnMode === "danger"
      ? "#f44336"
      : "#ffffff"};
  border: ${(props) =>
    props.btnMode === "primary"
      ? "1px solid #448ef7"
      : props.btnMode === "danger"
      ? "1px solid #f44336"
      : "1px solid #448ef7"};
  border-radius: 4px;
  width: 100%;
  padding: ${(props) => (props.btnSize === "sm" ? "5px 0px" : "10px")};
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const InputComponent = styled.input<InputProps>`
  font-size: 16px;
  color: #222222;
  border: 1px solid #bebdbdff;
  border-radius: 4px;
  width: 100%;
  padding: ${(props) =>
    props.IconPosition === "left"
      ? props.inputSize === "sm"
        ? "5px 5px 5px 30px"
        : "10px 10px 10px 40px"
      : props.IconPosition === "right"
      ? props.inputSize === "sm"
        ? "5px 5px 30px 5px"
        : "10px 10px 40px 10px"
      : props.IconPosition === "both"
      ? props.inputSize === "sm"
        ? "5px 5px 30px 30px"
        : "10px 10px 40px 40px"
      : props.inputSize === "sm"
      ? "5px 5px"
      : "10px 10px"};
`;

export const LabelElement = styled.label`
  font-size: 16px;
  color: #222222;
  font-weight: 600;
  display: block !important;
`;

export const ErrorElement = styled.div`
  height: 15px;
  font-size: 12px;
  color: red;
  display: block !important;
`;

// Component styles table

export const UserManagementWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .user-details-card {
    position: relative;
    width: 100%;
    border-radius: 5px;
    padding: 20px;
    cursor: pointer;
    border: 1px solid #00000033;
    overflow: hidden;
    background-color: #fff;
    // transition: background-color 0.3s ease;

    .image-hover,
    .text-center {
      transition: filter 0.3s ease;
      position: relative;
      z-index: 2;
    }

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      // background-color: rgba(0, 0, 0, 0); /* initial transparent */
      // backdrop-filter: blur(0px);
      // transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
      z-index: 1;
    }

    &:hover::before {
      background-color: rgba(0, 0, 0, 0.1); /* light dark overlay */
      // backdrop-filter: blur(2px); /* optional background blur */
    }

    &:hover .image-hover,
    &:hover .text-center {
      // filter: blur(4px);
    }
  }

  .image-hover {
    width: 128px;
    height: 128px;
  }
  .action-elements {
    position: absolute;
    top: 47%;
    right: 38%;
    z-index: 3;
    display: flex;
    gap: 5px;

    .edit-icon,
    .delete-icon {
      cursor: pointer;
    }
  }
`;

export const TableWrapper = styled.div`
  height: 70vh;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid #00000033;
  border-top: none;
  background: #fff;
  border-radius: 10px;
  overflow-y: scroll;

  thead {
    position: sticky;
    top: -1px;
    z-index: 0;

    tr th {
      background-color: #e0f0f8 !important;
      text-transform: capitalize;
      color: #047bba !important;
      font-size: 14px;
      font-weight: 600 !important;
      padding-top: 10px !important;
      padding-bottom: 10px !important;

      &:first-child {
        border-top-left-radius: 10px;
      }

      &:last-child {
        border-top-right-radius: 10px;
      }
    }
  }

  td {
    padding-left: 15px !important;
    color: #050e21;
    font-size: 15px;
    font-weight: 400;
    height: 40px;
    vertical-align: middle;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    border: none !important;
  }

  th {
    border: none !important;
  }

  tr {
    border: 1px solid #edf0f4 !important;
    height: 6.34vh !important;

    &:nth-child(even) {
      background: rgba(196, 196, 196, 0.12);
    }

    &:hover {
      background-color: #f5f5f5;
    }
  }

  table {
    margin: 0px;
    width: 100%;
    border-collapse: collapse;
  }
  @media only screen and (max-width: 1200px) {
    table {
      width: 150%;
      overflow-x: scroll;
    }
  }
  @media only screen and (max-width: 800px) {
    table {
      width: 200%;
      overflow-x: scroll;
    }
  }
  @media only screen and (max-width: 600px) {
    table {
      width: 450%;
      overflow-x: scroll;
    }
`;

export const NoRecordsWrapper = styled.div`
  text-align: center;

  .No_Records_Ctrl {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .No_Records_icon {
    width: 4rem;
    height: 4rem;
  }

  h4 {
    margin-top: 10px;
    font-weight: 500;
    font-size: 16px;
  }
`;
