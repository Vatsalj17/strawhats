import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const YourSub = () => {
  const { playerId } = useParams();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/reports/${playerId}/report`);
        // Map to only include status and date
        const simplifiedReports = res.data.reports.map(r => ({
          status: r.status,
          date: r.submissionDate || r.createdAt
        }));
        setReports(simplifiedReports);
      } catch (error) {
        setMessage(error?.response?.data?.message || 'Error fetching reports');
      } finally {
        setLoading(false);
      }
    };

    if (playerId) fetchReports();
  }, [playerId]);

  return (
    <div>
      <h2>Your Reports</h2>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      {!loading && reports.length === 0 && <p>No reports found</p>}
      <ul>
        {reports.map((report, idx) => (
          <li key={idx}>
            <p><b>Status:</b> {report.status}</p>
            {/* <p><b>Date:</b> {new Date(report.date).toLocaleString()}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourSub;
