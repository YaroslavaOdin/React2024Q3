import css from "styled-jsx/css";

export default css.global`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  #root,
  html,
  body,
  .mainBlock {
    height: 100vh;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #003468;
    margin-top: 20px;
    font-weight: 600;
    font-size: 40px;
  }

  input {
    width: 400px;
    height: 35px;
    padding-left: 10px;
    border: 1px solid #161616;
    border-radius: 5px;
    outline: none;
    background: #ffffff;
    color: #9e9c9c;
    margin-right: 20px;
  }

  button {
    width: 140px;
    height: 35px;
    border: none;
    background: #003468;
    border-radius: 3px;
    cursor: pointer;
  }

  .search-container {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #003468;
    font-weight: 500;
    font-size: 40px;
    margin-top: 100px;
  }

  .cards-container {
    display: flex;
    justify-content: space-between;
    max-height: 80%;
  }

  .results {
    width: 100%;
    margin-top: 30px;
    padding-left: 20px;
    overflow: auto;
  }

  .card {
    width: 190px;
    height: 140px;
    color: #003468;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
    margin-right: 25px;
    margin-top: 25px;
    border-radius: 2px;
    padding: 15px 10px;
    background: white;
  }

  .card_info {
    display: block;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #003468;
    margin-top: 20px;
    padding-bottom: 30px;
  }

  .theme-dark {
    background: #1c1c1c;
  }

  .theme-dark .input {
    border: 1px solid #1c1c1c;
    background: #1c1c1c;
    color: #353535;
  }

  .theme-dark button {
    color: white;
    background: rgb(0, 130, 223);
  }

  .theme-dark .card,
  .theme-dark .flyout {
    color: #ffffff;
    box-shadow: 1px 1px 5px rgba(67, 67, 67, 0.2);
    background: rgb(63, 63, 63);
  }

  .theme-dark .card_info,
  .theme-dark .error_text,
  .theme-dark .navigation,
  .theme-dark .pagination,
  .theme-dark .loader,
  .theme-dark .title,
  .theme-dark .flyout-text {
    color: #ffffff;
  }

  .theme-dark .select-card-btn {
    background: rgb(0, 140, 19);
  }

  .theme-dark .unselect-card-btn {
    background: rgb(140, 0, 0);
  }

  .cards-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding-bottom: 30px;
  }

  .arrow {
    width: 30px;
    border-radius: 50%;
  }

  .navigation {
    padding: 0 10px;
    color: #003468;
  }

  .flyout {
    background: white;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
    position: absolute;
    right: 0;
    top: 5;
    padding: 15px;
    z-index: 1;
  }

  .flyout-text {
    color: #003468;
    text-align: center;
    margin-bottom: 10px;
  }

  .flyout-unselet-btn {
    margin-left: 10px;
  }

  .flyout-link {
    display: inline-block;
    height: 35px;
  }

  a {
    color: #003468;
    cursor: pointer;
  }

  .card {
    position: relative;
  }

  .select-card-btn,
  .unselect-card-btn {
    position: absolute;
    bottom: 0;
    margin: 15px;
  }

  .select-card-btn {
    background: rgb(0, 111, 15);
  }

  .unselect-card-btn {
    background: rgb(106, 0, 0);
  }

  .card_link {
    margin-top: 5px;
  }

  .card_name {
    font-size: 20px;
  }

  .cards-details-section,
.no-details,
.loader-details {
  width: 50%;
  min-width: 50%;
  margin-top: 40px;
  border-left: 1px solid #003468;
  padding-left: 20px;
}

.card_details {
  color: #003468;
  margin-right: 25px;
  padding: 15px 10px;
}

.details-container {
  display: flex;
  flex-direction: column;
}

.details_close {
  margin-top: 20px;
}

.loader-details {
  color: #003468;
  font-weight: 500;
  font-size: 40px;
}

.theme-dark .cards-details-section,
.theme-dark .no-details,
.theme-dark .loader-detail {
  border-left: 1px solid #d5d5d5;
}

.theme-dark .card_details,
.theme-dark .loader-details {
  color: white;
}

.theme-btn {
  margin-left: 20px;
}

.theme-btn.theme-dark {
  color: white;
  background: rgb(0, 130, 223);
}

`;
