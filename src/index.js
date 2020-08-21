const create = () => {
	const plugins = {}
  
  const use = name => plugins[name]
  
  const register = async ({ name, setup }) => plugins[name] = await setup({ use })
  
  return {
  	register,
    use
  }
}

module.exports = { create }