(define-fungible-token stacks-loans-token u1000000)
(define-fungible-token stacks-loans-hodl-token u1000000)

(define-public (transfer (recipient principal) (amount uint))
   (match (ft-transfer? stacks-loans-token amount tx-sender recipient)
    result (ok true)
    error (err false))
)

(define-public (hodl (amount uint))
  (begin
    (unwrap-panic (ft-transfer? stacks-loans-token amount tx-sender (as-contract tx-sender)))
    (let ((original-sender tx-sender))
     (ok (unwrap-panic (as-contract (ft-transfer? stacks-loans-hodl-token amount tx-sender original-sender))))
    )
  )
)

(define-public (unhodl (amount uint))
  (begin
    (print (ft-transfer? stacks-loans-hodl-token amount tx-sender (as-contract tx-sender)))
    (let ((original-sender tx-sender))
      (print (as-contract (ft-transfer? stacks-loans-token amount tx-sender original-sender)))
    )
  )
)

(define-read-only (balance-of (owner principal))
   (+ (ft-get-balance stacks-loans-token owner) (ft-get-balance stacks-loans-hodl-token owner))
)

(define-read-only (hodl-balance-of (owner principal))
  (ft-get-balance stacks-loans-hodl-token owner)
)

(define-read-only (spendable-balance-of (owner principal))
  (ft-get-balance stacks-loans-token owner)
)

(define-read-only (get-spendable-in-bank)
  (ft-get-balance stacks-loans-token (as-contract tx-sender))
)

(define-read-only (get-hodl-in-bank)
  (ft-get-balance stacks-loans-hodl-token (as-contract tx-sender))
)

(define-private (mint (account principal) (amount uint))
    (begin
      (unwrap-panic (ft-mint? stacks-loans-token amount account))
      (unwrap-panic (ft-mint? stacks-loans-hodl-token amount (as-contract tx-sender)))
      (ok amount)))

(define-public (buy-tokens (amount uint))
  (begin
    (unwrap-panic (stx-transfer? amount tx-sender 'ST0EE1X0X7PHZHEE0A2N845FT568G0VMK4QX01XK))
    (mint tx-sender amount)
  )
)

;; Initialize the contract
(begin
  (mint 'ST0EE1X0X7PHZHEE0A2N845FT568G0VMK4QX01XK u990000)
)