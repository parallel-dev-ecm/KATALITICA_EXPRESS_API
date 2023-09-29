const insertIntoCompania = (table: string) => {
  const query = `
    INSERT INTO ${table} (
      clave_compania, rfc, razon_social, nombre_corto, nombre_largo,
      calle, colonia, estado, codigo_postal, contacto_persona, telefono
    ) 
    VALUES (
      @clave_compania COLLATE Latin1_General_CS_AS,
      @rfc COLLATE Latin1_General_CS_AS,
      @razon_social COLLATE Latin1_General_CS_AS,
      @nombre_corto COLLATE Latin1_General_CS_AS,
      @nombre_largo COLLATE Latin1_General_CS_AS,
      @calle COLLATE Latin1_General_CS_AS,
      @colonia COLLATE Latin1_General_CS_AS,
      @estado COLLATE Latin1_General_CS_AS,
      @codigo_postal,
      @contacto_persona COLLATE Latin1_General_CS_AS,
      @telefono
    )
    `;
  return query;
};

const getAllCompanies = (table: string) => {
  const query = `SELECT * FROM ${table}`; // Check that this matches your table name
  return query;
};

const getCompanyById = (table: string) => {
  const query = `SELECT * FROM ${table} WHERE id_compania = @Id`;
  return query; // Check that this matches your table name
};

const deleteCompanyById = (table: string) => {
  const query = `DELETE FROM ${table} WHERE id_compania = @Id`;
  return query;
};

const updateCompanyById = (table: string) => {
  const query = `
    UPDATE ${table} SET clave_compania = @clave_compania COLLATE Latin1_General_CS_AS,
    rfc = @rfc COLLATE Latin1_General_CS_AS, 
    razon_social = @razon_social COLLATE Latin1_General_CS_AS,
    nombre_corto =  @nombre_corto COLLATE Latin1_General_CS_AS, 
    nombre_largo = @nombre_largo COLLATE Latin1_General_CS_AS,
    calle = @calle COLLATE Latin1_General_CS_AS, 
    colonia =  @colonia COLLATE Latin1_General_CS_AS,
    estado =   @estado COLLATE Latin1_General_CS_AS,
    codigo_postal =  @codigo_postal,
    contacto_persona  = @contacto_persona COLLATE Latin1_General_CS_AS,
    telefono = @telefono WHERE id_compania = @Id
    `;
  return query;
};
const queries = {
  insertIntoCompania,
  getAllCompanies,
  getCompanyById,
  deleteCompanyById,
  updateCompanyById,
};
export default queries;
