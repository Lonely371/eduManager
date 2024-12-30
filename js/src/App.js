import React, { Component } from 'react';
import Container from './Container';
import Footer from './Footer';
import './App.css';
import { getAllStudents } from './client';
import AddStudentForm from './forms/AddStudentForm';
import {
  Avatar,
  Table,
  Spin,
  Modal,
  Empty
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const getIndicatorIcon = () => <LoadingOutlined type="loading" style={{fontSize:24}} spin/>

class App extends Component {
  state = {
    students: [],
    isFetching: false,
    isAddStudentModalVisible: false
  }

  componentDidMount() {
    this.fetchStudents();
  }

  openAddStudentModal = () => this.setState({isAddStudentModalVisible: true})
  closeAddStudentModal = () => this.setState({isAddStudentModalVisible: false})

  fetchStudents = () => {
    this.setState({
      isFetching: true
    })
    getAllStudents().then(res => res.json().then(students => {
      console.log(students);
      this.setState({
        students,
        isFetching: false
      });
    }));
  }

  render() {
    const { students, isFetching, isAddStudentModalVisible } = this.state;

    const commonElements = () => (
      <div>
        <Modal 
          title='Add new student' 
          open={isAddStudentModalVisible} 
          onOk={this.closeAddStudentModal} 
          onCancel={this.closeAddStudentModal}
          width={1000}>
            <AddStudentForm onSuccess={() => {this.closeAddStudentModal(); this.fetchStudents();}}/>
        </Modal>
        <Footer numberOfStudents={students.length} handleAddStudentClickEvent={this.openAddStudentModal} />
      </div>
    )

    if(isFetching) {
      return(
        <Container>
          <Spin indicator={getIndicatorIcon()}/>
        </Container>
      );
    }

    if(students && students.length) {

      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar size='large'>
              {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          title: 'Student ID',
          dataIndex: 'studentID',
          key: 'studentID'
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName'
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName'
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender'
        }
      ];

      return (
        <Container>
          <Table style={{marginBottom:'100px'}} dataSource={students} columns={columns} pagination={false} rowKey='studentID'/>
          {commonElements()}
        </Container>
      );

    }

    return (
      <Container>
        <Empty description={
          <h1>No Students Found</h1>
        }/>
        {commonElements()}
      </Container>
    )
  }
}

export default App;
