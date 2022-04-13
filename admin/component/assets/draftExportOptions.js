export const draftExportOptions = {
  entityStyleFn: (entity) => {
    const entityType = entity.get('type').toLowerCase()

    if (entityType === 'link') {
      const data = entity.getData()

      return {
        element: 'a',
        attributes: {
          href: data.url,
          target: '_blank'
        }
      }
    }
  }
}
