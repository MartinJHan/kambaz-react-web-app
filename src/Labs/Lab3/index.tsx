import { Container } from "react-bootstrap";
import BooleanVariables from "./BooleanVariables";
import IfElse from "./IfElse";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import LegacyFunctions from "./LegacyFunctions";
import ArrowFunctions from "./ArrowFunctions";
import ImpliedReturn from "./ImpliedReturn";
import TemplateLiterals from "./TemplateLiterals";
import SimpleArrays from "./SimpleArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";
import JsonStringify from "./JsonStringify";
import House from "./House";
import TodoItem from "./todos/TodoItem";
import TodoList from "./todos/TodoList";
import Spreading from "./Spreading";
import Destructing from "./Destructing";
import FunctionDestructing from "./FunctionDestructing";
import DestructingImports from "./DestructingImports";
import Classes from "./Classes";
import Styles from "./Styles";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";



export default function Lab3() {
  return (
    <Container className="mt-3">
      <h3>Lab 3</h3>
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
      </Highlight>
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Add a={3} b={4} />
      <Styles />
      <Classes />
      <DestructingImports />
      <FunctionDestructing />
      <Destructing />
      <Spreading />
      <TodoList />
      <TodoItem />
      <House />
      <JsonStringify />
      <FilterFunction />
      <FindIndex />
      <FindFunction />
      <MapFunction />
      <ForLoops />
      <AddingAndRemovingToFromArrays />
      <ArrayIndexAndLength />
      <SimpleArrays />
      <TemplateLiterals />
      <ImpliedReturn />
      <ArrowFunctions />
      <LegacyFunctions />
      <ConditionalOutputInline />
      <ConditionalOutputIfElse />
      <IfElse />
      <BooleanVariables />
      <VariableTypes />
      <VariablesAndConstants />
    </Container>
  );
} 