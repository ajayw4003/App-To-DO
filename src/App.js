import React, {useState, useEffect} from "react";
import './App.css';
import Header from "./components/Header";
import Input from "./components/Input";


function App() {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState("");

	//to check any previous data present
	useEffect(() => {
		console.log("initial loading")
		const data1 = localStorage.getItem("stringWhereWeStoreData");
		const loadedData = JSON.parse(data1);

		if(loadedData){
			setTodos(loadedData);
		}
	}, [])

	//to store data to local storage
	useEffect(() => {
		console.log("is data sotirng")
		var data1 = JSON.stringify(todos);
		localStorage.setItem("stringWhereWeStoreData", data1);
	}, [todos, todo])

	const randomNum =() => {
		return Math.floor(Math.random()*1000);
	}

	const handleInput = (val) =>{
		setTodo(val);
	}

	const addToDo = () =>{
		if(todo === " "){
			return;
		}
		// console.log("i am added");
		let newToDo = {
			id: randomNum(),
			listItem: todo,
			isEdit: false,
		}
		let updatedTodos = [...todos];
		updatedTodos.push(newToDo);
		setTodo(" ");
		setTodos(updatedTodos);
		
	}

	const handleDelete = (id) => {
		let updatedTodos = todos.filter((item) => item.id !== id);
		setTodos(updatedTodos);
	}

	const handleEdit = (id) => {
		let updatedTodos = todos.map((item) => {
			if(item.id === id){
				item.isEdit = true;
			}
			return item;
		})
		setTodos(updatedTodos);
	}

	const edited = (val, id) =>{
		let updatedTodos = todos.map((item) =>{
			if(item.id === id){
				item.listItem = val;
			}
			return item;
		})
		setTodos(updatedTodos);
	}

	const handleSave = (id, val) =>{
		if(val === ""){
			return;
		}
		let updatedTodos = todos.map((item) =>{
			if(item.id === id){
				item.isEdit = false;
			}
			return item;
		})
		setTodos(updatedTodos);
	}

	return (
		<div id = "main" className= "container">

			<div className = "app">
				<Header />
				<Input 
					handleInput ={handleInput} 
					addToDo = {addToDo}
					todo = {todo}
					/>

				<div className = "list-item">
					{todos.map((item, i) => (
						<li key = {i} className = "list">
							{item.isEdit ? 
								(<>
									<textarea 
										type = "text" 
										value = {item.listItem} 
										onChange = {(e) =>edited(e.target.value, item.id)}
										className = "editTask"
										/>
									<button 
										onClick = {() =>handleSave(item.id, item.listItem)} 
										className = "saveTask">Save
									</button>
								</>): 
								(<>
									<input value = {item.listItem} onChange = {(e) => e.prevenDefault()}/>
									<div>
										<button 
											className = "delete" 
											onClick = {() =>handleDelete(item.id)}>
											<i className="fa fa-trash"></i>
										</button>
										<button 
											className = "edit" 
											onClick = {() =>handleEdit(item.id)}>
											<i className="fa fa-pencil-square-o"></i>
										</button>
									</div>
								</>)
							}
							
						
						</li>
					))}
				</div>
				
			</div>
			
		</div>
	);
};


export default App;

