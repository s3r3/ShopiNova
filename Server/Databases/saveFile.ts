import pool from './file';

const saveContact = (email: string, phone: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO contacts (email, phone) VALUES ($1, $2);`, [email, phone], (err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Contact saved successfully');
        resolve('Data disimpan dengan sukses');
      }
    });
  });
};

export default saveContact;