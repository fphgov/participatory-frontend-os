import axios from "../assets/axios"
import React, { useState, useContext, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import StoreContext from '../../StoreContext'
import ListElement from "../common/ListElement"
import Pagination from "../common/Pagination"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSortAmountUp, faSortAmountDown } from "@fortawesome/free-solid-svg-icons"

export default function Ideas() {
  const context = useContext(StoreContext)

  const [ count, setCount ] = useState(0)
  const [ ideas, setIdeas ] = useState()
  const [ pageCount, setPageCount ] = useState(0)
  const [ links, setLinks ] = useState([])
  const [ refresh, setRefresh ] = useState(false)
  const [ requestBody, setRequestBody ] = useState(() => ({
    'search': '',
    'page': 1,
    'sort': 'desc',
  }))

  const notify = (message) => toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const handleChangeInput = ({ target: { name, value } }) => {
    setRequestBody({ ...requestBody, [name]: value })
  }

  const toggleSort = () => {
    const newSort = requestBody.sort === 'desc' ? 'asc' : 'desc'

    setRequestBody({ ...requestBody, sort: newSort })

    setRefresh(true)
  }

  const pagination = (_page) => {
    setRequestBody({ ...requestBody, page: _page })

    setRefresh(true)
  }

  const findIdeas = (e) => {
    if (e) {
      e.preventDefault()
    }

    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    let link = process.env.REACT_APP_API_ADMIN_REQ_IDEAS

    if (requestBody.page) {
      link += `?page=${requestBody.page}`
    }

    axios.post(process.env.REACT_APP_API_ADMIN_SERVER + link, new URLSearchParams(requestBody), config)
      .then(response => {
        if (response.data && response.data._embedded) {
          setIdeas(response.data._embedded.ideas)
          setLinks(response.data._links)
          setCount(response.data._total_items)
          setPageCount(response.data._page_count)
        } else {
          notify('⛔️ Sikertelen adat lekérés')
        }
      })
      .catch(() => {
        notify('⛔️ Sikertelen adat lekérés')
      })
      .finally(() => {
        context.set('loading', false)
      })
  }

  useEffect(() => {
    if (refresh) {
      setRefresh(false)
      findIdeas()
    }
  }, [refresh])

  return (
    <div className="reports">
      <div className="container">

        <h2 className="mt-5">Ötletek</h2>

        <form className="search-wrapper" onSubmit={findIdeas}>
          <input aria-labelledby="applicants-search" autoComplete="off" name="search" autoFocus={true} value={requestBody.search} onChange={handleChangeInput} />
          <input type="submit" value="Keresés" className="btn btn-primary"></input>
        </form>

        <div className="mt-4 row">
          <div className="col-md-6">
            <div className="sortable" onClick={toggleSort}>
              {requestBody.sort === 'desc' ? (
                <>
                  <FontAwesomeIcon icon={faSortAmountDown} aria-hidden="true" /> Rendezés: Csökkenő
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSortAmountUp} aria-hidden="true" /> Rendezés: Növekvő
                </>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="search-result">
              {count} találat
            </div>
          </div>

          {ideas && ideas.map((idea, i) => <div key={i} style={{ width: "100%" }}> <ListElement key={i} name="idea" object={idea} /></div>)}
        </div>

        <Pagination links={links} onChange={pagination} size={pageCount} />
      </div>

      <ToastContainer />
    </div>
  )
}
