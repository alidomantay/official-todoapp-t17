import React, { PropTypes } from 'react';
import TodoCon from '../components/TodoCon';
import TodoAdd from '../components/TodoAdd';
import TodoCounter from '../components/TodoCounter';
import TodoItem from '../components/TodoItem';
import TodoClear from '../components/TodoClear';
import TodoItemCon from '../components/TodoItemCon';
import AuthApi from '../api/AuthApi';
import TodoApi from '../api/TodoApi';
import Loading from '../components/Loading';

class TodoContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleOnAddItem = this.handleOnAddItem.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
        this.handleOnComplete = this.handleOnComplete.bind(this);
        this.handleClearList = this.handleClearList.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleGetCompleted = this.handleGetCompleted.bind(this);
        this.handleGetOpen = this.handleGetOpen.bind(this);
        this.handleGetAll = this.handleGetAll.bind(this);
        this.state = {
            items: [],
            user: '',
            completedCount: 0,
            isLoading: false,
            isLoadingItem: false,
            isUpdating: false,
            count: 0
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        let lastUserState = this.state.user; //get last state of user
        let lastItemState = this.state.items; //get last state of items
        if (lastUserState === '') {
            AuthApi.onGetUser().then((res) => {
                if (res.data.response) {
                    this.setState({
                        user: res.data.response//access the user using res.data.response.firstName, res.data.reponse.lastName,res/data.username for email
                    });
                    //then getowntodos
                    TodoApi.onGetOwnTodo(res.data.response._id)
                        .then((todos) => {
                            const completedCount = todos.todos.filter(todo => todo.isCompleted === true);
                            console.log(todos.todos.length);
                            this.setState({
                                completedCount: completedCount.length,
                                count: todos.todos.length
                            });
                            if (this.props.routeParams.mode === 'completed') {
                                this.setComplete(todos);
                            }
                            else if (this.props.routeParams.mode === 'open') {
                                this.setOpen(todos);
                            } else {
                                this.setState({
                                    items: [...lastItemState, ...todos.todos],
                                });
                            }
                            this.setState({ isLoading: false });
                        });
                } else {
                    this.context.router.push('/login/rdr');
                }
            });
        }
    }

    handleOnDelete(index, todo) {
        this.setState({ isUpdating: true });
        let lastItemState = this.state.items;
        TodoApi.onDelete(todo._id).then(res => {
            if (res.data.success) {
                lastItemState.splice(index, 1);
                this.setState({
                    items: [...lastItemState],
                    isUpdating: false,
                    count: this.state.count-1<1?0:this.state.count-1,
                });
                if(this.state.count-1<1){
                    this.setState({
                        completedCount:0
                    })
                }
                return;
            }
            this.setState({ isUpdating: false });
            alert(res.data.response);
        });
    }

    handleOnAddItem(e) {
        e.preventDefault();
        this.setState({ isLoadingItem: true });
        var lastState = this.state.items; //get last state of item
        let toDo = { //create a todo object to be saved
            name: e.target.elements[0].value,
            user: this.state.user,
            createDate: Date.now(),
        }
        TodoApi.onAdd(toDo).then(res => {
            if (res.data.success) {
                this.setState({ //update items
                    items: [...lastState, Object.assign({}, res.data.response)]
                });
                alert("Todo added");
                this.setState({ isLoadingItem: false, count:this.state.count+1 });
                return;
            }
            this.setState({ isLoadingItem: false });
            alert(res.data.response);
        });
    }

    handleOnComplete(todo, index) {
        this.setState({ isUpdating: true });
        let lastItems = this.state.items;
        TodoApi.onEdit(todo._id, "isCompleted", !todo.isCompleted)
            .then(res => {
                if (res.data.success) {
                    if (this.props.routeParams.mode === 'completed' || this.props.routeParams.mode === 'open') {
                        lastItems.splice(index, 1);
                    } else {
                        lastItems.splice(index, 1, res.data.response);
                    }
                    this.setState({
                        items: [...lastItems],
                        completedCount: todo.isCompleted ? this.state.completedCount - 1 : this.state.completedCount + 1,
                        isUpdating: false
                    });
                    return;
                }
                this.setState({ isUpdating: false });
                alert(res.data.response);
            });
    }

    setAll(res) {
        this.setState({ items: [...res.todos] });
    }

    setComplete(res) {
        const completed = res.todos.filter(todo => todo.isCompleted === true);
        this.setState({ items: [...completed] });
    }

    setOpen(res) {
        const open = res.todos.filter(todo => todo.isCompleted === false);
        this.setState({ items: [...open] });
    }

    handleGetAll() {
        this.setState({ isUpdating: true });
        this.context.router.push('/todos');
        TodoApi.onGetOwnTodo(this.state.user._id)
            .then(res => {
                this.setAll(res);
                this.setState({ isUpdating: false });
            });
    }

    handleGetCompleted() {
        this.context.router.push('/todos/completed');
        this.setState({ isUpdating: true });
        TodoApi.onGetOwnTodo(this.state.user._id)
            .then(res => {
                this.setState({ isUpdating: false });
                this.setComplete(res);
            });
    }

    handleGetOpen() {
        this.setState({ isUpdating: true });
        this.context.router.push('/todos/open');
        TodoApi.onGetOwnTodo(this.state.user._id)
            .then(res => {
                this.setState({ isUpdating: false });
                this.setOpen(res);
            });
    }

   handleClearList(){
        this.setState({isUpdating:true});
        TodoApi.onDeleteAll(this.state.user._id)
        .then(res=>{
            if(res.data.success){
                alert("Completed removed");
                this.setState({
                    items: [...res.data.todo],
                    isUpdating: false,
                    completedCount:0,
                    count: res.data.todo.length
                });
                return;
            }
            this.setState({isUpdating:falses});
            alert(res.data.response);
        }).catch(err=>{
            this.setState({isUpdating:falses});
            alert('Ooops! Try again');
        });
    }

    handleLogout() {
        AuthApi.onLogout();
    }

    render() {
        let displayTodo=this.state.items.map((item, index) => 
                            <TodoItem 
                                key={index}
                                index={index}
                                onDeleteTodo= {this.handleOnDelete}
                                onClickTodo= {this.handleOnComplete}
                                todo={item}
                                isLoading={this.state.isUpdating}/>);
        if(this.state.isUpdating===true){
            displayTodo=<Loading mode={"mini"}/>;
        }
        if(this.state.isLoading===true){
            return <Loading mode={"large"}/>;
        }
        return (
            <TodoCon logout={this.handleLogout} user={this.state.user}>
                <TodoAdd
                    onAddItem={this.handleOnAddItem}
                    isLoadingItem ={this.state.isLoadingItem}
                />
                <TodoCounter
                    onCompletedCount={this.state.completedCount}
                    onCount={this.state.count}
                    getCompleted={this.handleGetCompleted}
                    getOpen={this.handleGetOpen}
                    getAll={this.handleGetAll}
                />
                <TodoItemCon>
                    {displayTodo}
                </TodoItemCon>
                <TodoClear clear={this.handleClearList}/>
            </TodoCon>
        );
    }
}

TodoContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

export default TodoContainer;