import chefIcon from "../assets/chef.png";
import "../styles/Header.css";
export default function Header() {
  return (
    <>
      <header>
        <img src={chefIcon} alt="" />
        <h1>Chef Claude</h1>
      </header>
    </>
  );
}
