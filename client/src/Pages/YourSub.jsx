import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCurrentUser } from '../Context/CurrentUserContext';

const YourSub = () => {
  const { playerId } = useParams();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const {currentUser} = useCurrentUser()

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/reports/${playerId}/report`
        );

        // Ensure we always have an array and no nulls
       setReports(Array.isArray(res.data.reports) ? res.data.reports : [res.data.reports])
        setMessage(res.data.message || (reportsData.length === 0 ? 'No submissions found' : ''));
      } catch (error) {
        setMessage(error?.response?.data?.message || 'Error fetching reports');
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [playerId]);

  if (loading) return <p>Loading reports...</p>;

  return (
    <div>
      <h2>Player Reports</h2>
      {reports.length === 0 ? (
        <p>{message}</p>
      ) : (
    <ul>
  {reports.length === 0 ? (
    <p>{message}</p>
  ) : (
    reports.map((report) =>
      report ? (
        <li key={report._id || Math.random()}>
          <p><strong>Name:</strong> {report.name || 'No name'}</p>
          <p><strong>Age:</strong> {report.age || 'N/A'}</p>
          <p><strong>Sports:</strong> {report.sports?.join(', ') || 'N/A'}</p>
          <p><strong>Status:</strong> {report.status}</p>
        </li>
      ) : null
    )
  )}
</ul>

      )}
    </div>
  );
};

export default YourSub;
