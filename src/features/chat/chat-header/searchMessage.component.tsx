import { useState, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import Button from "src/components/button";
import { useNavigate, useParams } from "react-router-dom";
import useSearchMessage from "../chat.hook";
import { useGetUser } from "src/hooks/useAuth";
import Avatar from "src/components/avatar";
import { formatDate } from "src/utils/format-time";
import { PARAMS } from "src/constants/searchParams.constant";

const SearchMessage = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const [searchedMessage, setSearchedMessage] = useState<
    {
      created_at: string;
      message: string;
      id: string;
      author_profile: IUserProfile;
    }[]
  >([]);
  const { id } = useParams();
  const { user } = useGetUser();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("");
  const { findMessage, isFindingMessage, isFound } = useSearchMessage();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;
    findMessage({
      roomId: id!,
      userId: user!.id,
      message: search,
    }).then((data) => setSearchedMessage(data || []));
  };
  const handleSelectedMessage = (id: string) => {
    navigate({ search: `${PARAMS.selectMessageId}=${id}` });
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div
      style={{
        top: "65px",
        left: 0,
      }}
      className="px-3 py-4  absolute w-full z-10 bg-[var(--color-grey-100)]"
    >
      <div className="flex items-center gap-5">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 w-full h-[40px] px-1.5 rounded-md bg-[var(--color-grey-400)] flex-1"
        >
          <HiOutlineSearch />
          <input
            type="text"
            ref={inputRef}
            placeholder="Find messages"
            className="bg-none outline-none w-full h-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <Button onClick={onClose} variation="neutral">
          Close
        </Button>
      </div>
      <div>
        <ul>
          {isFindingMessage && <p className="text-center mt-4">Finding...</p>}
          {isFound && searchedMessage.length === 0 && (
            <p className="text-center mt-4">No results found...</p>
          )}
          {searchedMessage.length > 0 &&
            searchedMessage.map((message) => {
              const matchedText = message.message.replace(
                new RegExp(search, "i"),
                function (match) {
                  return `<span style="color: var(--color-primary);">${match}</span>`;
                }
              );
              return (
                <li
                  key={message.id}
                  onClick={() => handleSelectedMessage(message.id)}
                  className="cursor-pointer px-3 py-6 flex items-center justify-between hover:bg-[var(--color-grey-200)] duration-200"
                >
                  <div className="flex gap-2">
                    <Avatar src={message.author_profile.avatar} size="medium" />
                    <div className="flex flex-col justify-between">
                      <h2 className="text-sm font-semibold">
                        {message.author_profile.fullname}
                      </h2>
                      <div>
                        <div
                          dangerouslySetInnerHTML={{ __html: matchedText }}
                        />
                      </div>
                    </div>
                  </div>
                  <p>{formatDate(new Date(message.created_at))}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default SearchMessage;
