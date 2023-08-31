//登录用户选择
const User = ({changePage}) => {
  const [userList,setUserList]=React.useState([{name:111}])
  const onFinish = async (values) => {
    if (values.split("@")[1]) {
      let dbList = []
      if (window?.versions) {
        dbList = await window?.versions?.getDbValue()
        if (dbList.find(item => item?.alias == values.split("@")[1])) {
          await window?.versions?.setuserInfo({ DNS: values.split("@")[1], name: values.split("@")[0] });
        } else {
         
         antd.message.error('没有该组织')
          return
        }
      }

      window.location.href =
        // "http://192.168.50.120:8312/";
        'https://desktop.system.app.' + dbList.filter(item => item?.alias == values.split("@")[1])[0]?.id;
    }
  };

  const getValue = async () => {
    if (window?.versions) {
      let List=await window?.versions?.invokMethod('getLogList')
         setUserList(List)
    }
  }
   const addObverser = async () => {
    if (window?.versions) {
      await window?.versions?.getMessage('change-env',async(event,arg)=>{
         let List=await window?.versions?.invokMethod('getLogList')
         setUserList(List)
      })
    
    }
  }
  React.useEffect(() => {
    getValue()
    addObverser()
  }, []);

  return (
    <>
    {userList.map(item=>{
      return item?.name ?
     <div className='userInfo'onClick={()=>onFinish(item?.name+'@'+item?.DNS)}>
      <div className='userImg'><img src={item?.avatar||'./img/userInfo.svg'}></img></div>
      <div className='useName'>{item?.display_name}</div>
      <div className='useOrg'>{item?.name}@{item?.DNS}</div>
     </div>:''
     
    })}
     <div className='userInfo' onClick={()=>changePage('second')}>
      <div className='userImg'><img src={'./img/userInfo.svg'}></img></div>

     </div>
    </>
  );
};

//登录(输入账号密码)
const Login = ({changePage}) => {

  const onFinish = async (values) => {
    if (values?.usePoint.split("@")[1]) {
      let dbList = []
      if (window?.versions) {
        dbList = await window?.versions?.getDbValue()
        if (dbList.find(item => item?.alias == values?.usePoint.split("@")[1])) {
          await window?.versions?.setuserInfo({ DNS: values?.usePoint.split("@")[1], name: values?.usePoint.split("@")[0] });
        } else {
          antd.message.error('没有该组织')
          return
        }
      }

      window.location.href =
        // "http://192.168.50.120:8312/";
        'https://desktop.system.app.' + dbList.filter(item => item?.alias == values?.usePoint.split("@")[1])[0]?.id;
    }
  };
  const [form] = antd.Form.useForm();
  const addObverser = async () => {
    if (window?.versions) {
      await window?.versions?.getMessage('change-env',(event,arg)=>{
        form.setFieldsValue({ usePoint:''});
      })
    
    }
  }
  React.useEffect(() => {
    addObverser()
  }, []);

  return (
    <div>
      <antd.Form form={form} onFinish={onFinish} layout={"vertical"}>
        <div className="account">
          <antd.Form.Item
            name="usePoint"
            rules={[
              { required: true, message: "请输入账号!" },
            ]}
            label=""
          >
            <antd.Input placeholder="请输入账号" style={{ width: "100%" }} suffix={
            <antd.Button className="loginButton"  htmlType="submit">
            <img src="asset/arrowhead.png" alt="" />
          </antd.Button>}/>
          </antd.Form.Item>
        </div>
      </antd.Form>
    </div>
  );
};


const MessageBox = () => {
  const [page,setPage]=React.useState('first')
  return (<>
    <div className="login">
      {page=='first'&&<User  changePage={(res)=>setPage(res)}/>}
      {page=='second'&&<Login  changePage={(res)=>setPage(res)}/>}
    </div>
  </>
  );
};

ReactDOM.render(<MessageBox />, document.getElementById("app"));
