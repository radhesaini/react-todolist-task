import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: [
            { name: '1', stage: 0 },
            { name: '2', stage: 0 },
        ],
      currentInput: ""
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  createTask = (e) => {
      e.preventDefault();
      this.setState({tasks: [...this.state.tasks, {name: this.state.currentInput, stage: 0}]
      ,currentInput: ""})
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({currentInput: e.target.value})
  }

  moveForRight = (index) => {
     this.state.tasks[index].stage += 1;
     this.setState({tasks: this.state.tasks})
  }

  moveForLeft = (index) => {
    this.state.tasks[index].stage -= 1;
    this.setState({tasks: this.state.tasks})
 }

 handleDelte = (index) => {
  this.state.tasks.splice(index, 1);
  this.setState({tasks: this.state.tasks});
 }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center" >
          <input id="data-test-id"  type="text" className="large" placeholder="New task name" data-testid="create-task-input" value={this.state.currentInput} onChange={this.handleInput}/>
          <button type="submit" disabled={this.state.currentInput.length === 0} className="ml-30" data-testid="create-task-button" onClick={this.createTask}>Create task</button>
        </section>

        <div className="mt-50 layout-row">
            {stagesTasks.map((tasks, i) => {
                return (
                    <div className="card outlined ml-20 mt-0" key={`${i}`}>
                        <div className="card-text">
                            <h4>{this.stagesNames[i]}</h4>
                            <ul className="styled mt-50" data-testid={`stage-${i}`}>
                                {tasks.map((task, index) => {
                                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                      <div className="li-content layout-row justify-content-between align-items-center">
                                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                        <div className="icons">
                                          <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`} disabled={this.state.tasks[this.state.tasks.indexOf(task)].stage === 0} onClick={()=>this.moveForLeft(this.state.tasks.indexOf(task))}>
                                            <i className="material-icons" disabled={this.state.tasks[this.state.tasks.indexOf(task)].stage === 0}>arrow_back</i>
                                          </button>
                                          <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`} disabled={this.state.tasks[this.state.tasks.indexOf(task)].stage === 3} onClick={()=>this.moveForRight(this.state.tasks.indexOf(task))}>
                                            <i className="material-icons" disabled={this.state.tasks[this.state.tasks.indexOf(task)].stage === 3}>arrow_forward</i>
                                          </button>
                                          <button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`} onClick={()=>this.handleDelte(this.state.tasks.indexOf(task))}>
                                            <i className="material-icons">delete</i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
  }
}