import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function Category(props) {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, "listings");

        // Create a query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // Execute query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, [params.categoryName]);
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Place for rent"
            : "Places for sale"}
        </p>
      </header>

      <>
        <main>
          {loading ? (
            <h2>Loading</h2>
          ) : listings && listings.length > 0 ? (
            <>
              <main>
                <ul className="categoryListings">
                  {listings.map((listing) => (
                    <h3 key={listing.id}>{listing.data.name}</h3>
                  ))}
                </ul>
              </main>
            </>
          ) : (
            <p>There is no Listings {params.categoryName}</p>
          )}
        </main>
      </>
    </div>
  );
}

export default Category;
