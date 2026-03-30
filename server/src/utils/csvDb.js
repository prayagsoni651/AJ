const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../database');

const readCsv = (filename) => {
  const filePath = path.join(DB_PATH, filename);
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim() !== '');
  if (lines.length <= 1) return [];
  
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, i) => {
      let val = values[i];
      // Auto-cast numbers
      if (!isNaN(val) && val !== '') val = Number(val);
      obj[header] = val;
      return obj;
    }, {});
  });
};

const writeCsv = (filename, data) => {
  const filePath = path.join(DB_PATH, filename);
  if (data.length === 0) return;
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
  fs.writeFileSync(filePath, `${headers}\n${rows}\n`, 'utf-8');
};

const appendCsv = (filename, row) => {
  const filePath = path.join(DB_PATH, filename);
  const values = Object.values(row).join(',') + '\n';
  fs.appendFileSync(filePath, values, 'utf-8');
};

module.exports = { readCsv, writeCsv, appendCsv };
