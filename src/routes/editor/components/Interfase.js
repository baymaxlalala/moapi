import React from "react";
import EditableTable from './EditableTable'
import AddValueModal from './AddValueModal'
import AddRemarkModal from './AddRemarkModal'
import RecordModal from './RecordModal'
import ShowCode from './ShowCode'
import LeadInModal from './LeadInModal'
import {Button,List,Radio,message,Modal,Input} from 'antd'
import Style from './Interfase.less'
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx';
import fetchApi from '@/api'
const ButtonGroup = Button.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@inject("interfases","project")
@observer
class Interfase extends React.Component {
  state = {
    resLeadInModalShow: false,
    reqLeadInModalShow: false,
    addValueModalShow:false,
    addRemarkModalShow:false,
    recordModalShow:false,
    resPreview: true,
    reqPreview: true,
  }
  addValue={}
  recordMessage=""

  saveInterfase = () => {
    this.props.interfases.closeEditable()
    this.fetchSaveInterfase()
    this.setState({recordMessage:""})
  }

  handleAddRemarkOk=(info)=>{

  }

  handleAddRemark=(e)=>{
    this.setState({addRemarkModalShow:true})
  }

  handleRecordInputChange=(e)=>{
    this.setState({recordMessage:e.target.value})
  }
  addRecord=()=>{
    Modal.confirm({
      title:'添加修改记录',
      okText:"保存",
      content:<Input defaultValue={this.state.recordMessage} onChange={this.handleRecordInputChange} ></Input>,
      onOk:()=>{
        this.saveInterfase()
      },
      onCancel:()=>{
        this.setState({recordMessage:""})
      }
    })
  }
  edit = () => {
    this.props.interfases.openEditable()
  }
  cancel = () => {
    this.props.interfases.closeEditable()
  }
  resLeadInOk=(code)=>{
    this.props.interfases.leadInRes(code);
  }
  reqLeadInOk=(code)=>{
    this.props.interfases.leadInReq(code);
  }
  addValueSuccess=(value)=>{
    this.addValue.value=value;
    this.props.interfases.addValue(this.addValue)
  }
  openAddValue=(type,key)=>{
    this.setState({addValueModalShow:true})
    this.addValue={type:type,key:key,value:null}
  }
  openRecord=()=>{
    this.setState({recordModalShow:true})
  }

  handleProxyTypeChange=(e)=>{
    this.props.interfases.changeProxyType(e.target.value)
  }

  fetchSaveInterfase() {
    const data=toJS(this.props.interfases.data);
    data.recordMessage=this.state.recordMessage;
    fetchApi.fetchUpdateInterfase(this.props.interfases.data.id,data).then(()=>{
        message.success('保存成功');
    })
  }

  render() {
    //console.log(this.props.interfases.resMock)
    return (<div className={Style.wrapper}>
      <AddRemarkModal onClose={() => {
          this.setState({addRemarkModalShow: false})
        }}  visible={this.state.addRemarkModalShow} onOk={this.handleAddRemarkOk}></AddRemarkModal>
      <LeadInModal onClose={() => {
          this.setState({resLeadInModalShow: false})
        }} title="导入请求属性" visible={this.state.resLeadInModalShow} onOk={this.resLeadInOk} ></LeadInModal>
      <LeadInModal onClose={() => {
          this.setState({reqLeadInModalShow: false})
        }} title="导入响应属性" visible={this.state.reqLeadInModalShow} onOk={this.reqLeadInOk}></LeadInModal>
      <AddValueModal onClose={() => {
          this.setState({addValueModalShow: false})
        }} title="导入属性" visible={this.state.addValueModalShow} onOk={value=>{this.addValueSuccess(value)}}></AddValueModal>
      <RecordModal onClose={() => {
          this.setState({recordModalShow: false})
        }} title="导入属性" visible={this.state.recordModalShow}></RecordModal>
      <div className={Style.header}>
        <ul>
          <li>
            <h3>
              {this.props.interfases.data.name} <Button onClick={this.openRecord} type="primary" size="small">修改记录</Button>&emsp;
              {this.props.interfases.editable&&<RadioGroup onChange={this.handleProxyTypeChange} value={this.props.interfases.data.proxyType}>
                <RadioButton value={0}>关闭mock</RadioButton>
                <RadioButton value={1}>开启mock</RadioButton>
                <RadioButton value={2}>合并mock</RadioButton>
              </RadioGroup>}
            </h3>
          </li>
          <li>地址:
            <a href="">{this.props.interfases.data.url}</a>
          </li>
          <li>类型: {this.props.interfases.data.methods}</li>
        </ul>
        {this.props.project.permission>1&&<div>
          {
            this.props.interfases.editable
              ? <ButtonGroup >
                  <Button onClick={this.saveInterfase} type="primary">直接保存</Button>
                  <Button onClick={this.addRecord} type="primary">保存</Button>
                  <Button onClick={this.cancel}>&emsp;&emsp;取消&emsp;&emsp;</Button>
                </ButtonGroup>
              : <Button onClick={this.edit} type="primary">&emsp;&emsp;编辑&emsp;&emsp;</Button>
          }
        </div>}
      </div>



      <div className={Style.title}>
        <h3>请求参数</h3>
        <div className={Style.titleRight}>
          <ButtonGroup >
            {this.props.interfases.editable&&this.props.project.permission>2&&<Button onClick={()=>{this.openAddValue('req',null)}}>新建</Button>}
            {this.props.interfases.editable&&<Button onClick={() => {
                this.setState({reqLeadInModalShow: true})
              }}>导入</Button>}
            <Button type={this.state.reqPreview
                ? 'primary'
                : ''} onClick={() => {
                this.setState({
                  reqPreview: !this.state.reqPreview
                })
              }}>预览</Button>
          </ButtonGroup>
        </div>
      </div>
      <EditableTable permission={this.props.project.permission} isReq onOpenAddValue={this.openAddValue} data={toJS(this.props.interfases.data.req)}></EditableTable>
      {
        this.state.reqPreview &&< div className = {
          Style.codeWrapper
        } >
          <ShowCode code={this.props.interfases.reqMock} title="请求模板"></ShowCode>
          <ShowCode code={this.props.interfases.reqCode}  title="请求属性"></ShowCode>
        </div>
      }



      <div className={Style.title}>
        <h3>响应内容</h3>
        <div className={Style.titleRight}>
          <ButtonGroup >
            {this.props.interfases.editable&&<Button onClick={()=>{this.openAddValue('res',null)}}>新建</Button>}
            {this.props.interfases.editable&&<Button onClick={() => {
                this.setState({resLeadInModalShow: true})
              }}>导入</Button>}
            <Button type={this.state.resPreview
                ? 'primary'
                : ''} onClick={() => {
                this.setState({
                  resPreview: !this.state.resPreview
                })
              }}>预览</Button>
          </ButtonGroup>
        </div>
      </div>
      <EditableTable permission={this.props.project.permission} data={toJS(this.props.interfases.data.res)}></EditableTable>
      {
        this.state.resPreview &&< div className = {
          Style.codeWrapper
        } >
          <ShowCode code={this.props.interfases.resMock}  title="响应模板"></ShowCode>
          <ShowCode code={this.props.interfases.resCode}  title="响应属性"></ShowCode>
        </div>
      }

      <div className={Style.title}>
        <h3>备注</h3>
        {this.props.project.permission>2&&<Button onClick={this.handleAddRemark} className={Style.titleBtn} size="small" type="primary">添加</Button>}
      </div>

      <List
      size="small"
      bordered
      dataSource={this.props.interfases.data.remarks}
      renderItem={item => (
        <List.Item actions={[<a>编辑</a>, <a>删除</a>]}>
          <List.Item.Meta
                title={<div>{item.version}&emsp;{item.timeStamp}</div>}
                description={item.message}
              />
          <div>{item.name}</div>
        </List.Item>)}
      />
    </div>)
  }
}

export default Interfase;
