const create = () => {
	const plugins = {}
  
  const use = name => plugins[name]
  
  const register = async ({ name, setup }, config = null) => plugins[name] = await setup({ use, register, config })
  
  return { register, use }
}

module.exports = { create }
