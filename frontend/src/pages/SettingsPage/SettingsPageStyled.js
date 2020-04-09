import styled from 'styled-components'

export const BlockHeading = styled.h2`
  color: #000;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 25px;
`
export const UserInfoWrapper = styled.div`
  display: block;
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
`
export const UserInfoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 30px;
  margin-bottom: 30px;
`
export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .img {
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  .info {
    margin-left: 30px;
    p {
      color: #000;
      font-weight: 500;
      font-size: 20px;
      margin-bottom: 5px;
    }
    a {
      color: #fc0000;
      img {
        width: 14px;
        margin-left: 5px;
      }
    }
  }
`
export const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .ant-btn {
    margin-left: 10px;
  }
`
export const AppSettingWrapper = styled.div`
  max-width: 980px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
`