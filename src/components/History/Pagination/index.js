import React from 'react'
import './pagination.scss'
// import classNamees from './css'
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp'
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp'

const Pagination = props => {

  return (
    <div>
      {
        props.pageNumber.length > 1
          ? <div className="pg">
            {
              props.setPagination.currentPage === 1
                ? <button className="pg__start"><ArrowBackIosSharpIcon/></button>
                : <button className="pg__arrowPrev"
                          onClick={() => props.startBtnPagination()}><ArrowBackIosSharpIcon/></button>
            }
            {props.pageNumber.map((number, index) => {
              return <button key={index} onClick={() => props.activeBtnPagination(index)} className={
                props.setPagination.currentPage === number
                  ? "pg__btn active"
                  : "pg__btn"
              }>{number}</button>
            })}
            {
              props.setPagination.currentPage === props.pageNumber.length
                ? <button className="pg__end">
                  <ArrowForwardIosSharpIcon/>
                </button>
                : <button className="pg__arrowNext" onClick={() => props.endBtnPagination()}>
                  <ArrowForwardIosSharpIcon/>
                </button>
            }
          </div>
          : false
      }
    </div>
  )
}

export default Pagination