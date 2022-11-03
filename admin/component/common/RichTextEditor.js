import React from 'react'
import axios from '../assets/axios'
import { Editor } from '@tinymce/tinymce-react'

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce'

import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/skins/ui/oxide/skin.min.css'

import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/code'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'

/* eslint import/no-webpack-loader-syntax: off */
import contentCss from 'tinymce/skins/content/default/content.min.css?raw'
import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css?raw'

const image_upload_handler = (blobInfo, success, failure, progress) => {
  const formData = new FormData()

  formData.append('file', blobInfo.blob(), blobInfo.filename())

  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
      'Accept': 'application/json',
    },
    onUploadProgress: progressEvent => {
      progress(Math.round((progressEvent.loaded / progressEvent.total) * 100))
    }
  }

  axios
  .post(process.env.REACT_APP_API_ADMIN_UPLOAD, formData, config)
  .then(response => {
    if (response.data && response.data.data && response.data.data.filename) {
      const url = 'https:' + process.env.REACT_APP_SERVER_FILE + '/' + response.data.data.filename

      success(url)
    }
  })
  .catch((error) => {
    failure('Image upload failed due to a XHR Transport error. Code: ' + error.response.status)
  })
}

export default function RichTextEditor(props) {
  const customContentCss = 'body { font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif; font-size:16px }'
  const initProps = {
    skin: false,
    content_css: false,
    content_style: [contentCss, contentUiCss, customContentCss].join('\n'),
    menubar: false,
    statusbar: false,
    images_upload_handler: image_upload_handler,
    automatic_uploads: true,
    plugins: [
      'advlist autolink lists link image charmap preview anchor',
      'code insertdatetime media table paste code'
    ],
    toolbar: 'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright | anchor bullist numlist outdent indent | ' +
      'link | image media | preview | ' +
      'removeformat | code',
    ...props.init
  }

  let propsWithoutInit = {...props}

  delete propsWithoutInit['init']

  return (
    <Editor init={initProps} {...propsWithoutInit} />
  )
}
