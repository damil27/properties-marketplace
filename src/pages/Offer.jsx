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
import ListingItems from "./../components/listingItems";

function Offer(props) {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, "listings");

        // Create a query
        const q = query(
          listingsRef,
          where("offer", "==", true),
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
        console.log(listings);
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, []);
  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
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
                    <ListingItems
                      key={listing.id}
                      listing={listing.data}
                      id={listing.id}
                    />
                  ))}
                </ul>
              </main>
            </>
          ) : (
            <p>There is no Listings </p>
          )}
        </main>
      </>
    </div>
  );
}

export default Offer;
