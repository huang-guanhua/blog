import request from './axios';

// const host = 'https://huangguanhua.cn'
const host = ''

const login = `${host}/api/login`;
const register = `${host}/api/register`;
const list = `${host}/api/list`;
const menu = `${host}/api/menu/list`;
const sendEmail = `${host}/api/email`;
const sendMessage = `${host}/api/message`;

export const getAction = () => {
  return request('/api/topics/hot.json').then(res => {
    console.log(res)
  })
}

export const getInfo = () => {
  return request('/api/nodes/show.json', {name: 'python'}).then(res => {
    console.log(res)
  })
}

export const getlogin = (data) => {
  return request({
    method: 'post',
    url: login,
    data
  })
}

export const getregister = (data) => {
  return request({
    method: 'post',
    url: register,
    data
  })
}

export const getList = (params) => {
  return request({
    method: 'get',
    url: list,
    params
  })
}

export const getmenuList = (params) => {
  return request({
    method: 'get',
    url: menu,
    params
  })
}

export const getSendEmail = (params) => {
  return request({
    method: 'post',
    url: sendEmail,
    data: params
  })
}

export const getSendMessage = (info) => {
  return request({
    method: 'post',
    url: sendMessage,
    data: info
  })
}