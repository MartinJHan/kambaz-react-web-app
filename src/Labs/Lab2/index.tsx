import BackgroundColors from "./BackgroundColors";
import ForegroundColors from "./ForegroundColors";
import Borders from "./Borders";
import "./index.css";
import Padding from "./Padding";
import Margins from "./Margins";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Positions from "./Positions";
import Zindex from "./Zindex";
import GridLayout from "./GridLayout";
import Float from "./Float";
import Flex from "./Flex";
import { Container } from "react-bootstrap";
import BootstrapGrids from "./BootstrapGrids";
import BootstrapTables from "./BootstrapTables";
import BootstrapLists from "./BootstrapLists";
import BootstrapForms from "./BootstrapForms";
import BootstrapNavigation from "./BootstrapNavigation";

export default function Lab2() {
  return (
    <Container>
      <div id="wd-lab2">
        <h2>Lab 2 - Cascading Style Sheets</h2>
        <BootstrapNavigation />
        <BootstrapForms />
        <BootstrapLists />
        <BootstrapTables />
        <BootstrapGrids />
        <hr />
        <Flex />
        <hr />
        <GridLayout />
        <hr />
        <Float />
        <hr />
        <Positions />
        <hr />
        <Zindex />
        <hr />
        <Dimensions />
        <hr />
        <Corners />
        <hr />
        <Margins />
        <hr />
        <Padding />
        <hr />
        <Borders />
        <hr />
        <BackgroundColors />
        <hr />
        <ForegroundColors />
        <hr />
        <h3>Styling with the STYLE attribute</h3>
        <p id="wd-lab2-style-attribute">
          Style attribute allows configuring look and feel
          right on the element. Although it's very convenient
          it is considered bad practice and you should avoid
          using the style attribute
        </p>

      </div>
    </Container>
  );
    
}