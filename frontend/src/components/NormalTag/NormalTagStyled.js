import React from 'react'
import styled from 'styled-components'

export const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: -5px;
  pointer-events: none;
  .tag-wrapper {
    display: block;
    max-width: 250px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px 10px 5px 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    position: fixed;
    opacity: 0;
    visibility: hidden;
    z-index: 2;    
  }
  &:hover {
    .tag-wrapper {
      opacity: 1;
      visibility: visible;
    }
  }
`
export const Tag = styled.li`
  display: inline-block;
  color: #666;
  font-size: 14px;
  background-color: #F5F6F8;
  border-radius: 100px;
  padding: 2px 10px;
  position: relative;
  margin-right: 5px;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const ShowAllTagsButton = styled.span`
  color: #666666;
  font-size: 14px;
  background-color: #F5F6F8;
  border-radius: 50%;
  text-align: center;
  width: 25px;
  height: 25px;
  line-height: 26px;
  pointer-events: auto;
  margin-bottom: 8px;
  &:hover {
    cursor: pointer;
  }
`
