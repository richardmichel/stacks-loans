(define-data-var stx-deposit uint u0)
(define-data-var lockup-period uint u6)
(define-data-var interest uint u0)
(define-data-var fee uint u5)
(define-constant client 'ST398K1WZTBVY6FE2YEHM6HP20VSNVSSPJTW0D53M)
(define-constant server 'ST1618RD5WAQMGNX4KQ4KBWBGP0X59BT5P324DB1S)
(define-constant escrow 'ST398K1WZTBVY6FE2YEHM6HP20VSNVSSPJTW0D53M.stacks-loans-2)


;;PUBLIC FUNCTIONS
;;Client will choose amount to deposit and lockup period
;;Client will transfer amount to escrow
(define-public (client-deposit (stx uint))
    (ok
        (begin 
            (var-set stx-deposit stx)
            ;;(var-set lockup-period months)
            (transfer-client-to-escrow)
            (pay-fee)
        )
    )
)

;;Server will calculate interest based on lockup-period and stx-deposit
;;Server will deposit interest amount to escrow
;;Escrow will deposit to client and server
(define-public (server-deposit)
    (ok 
        (begin
            (calculate-interest)
            (transfer-server-to-escrow)
            (transfer-escrow-to-client)
            (transfer-escrow-to-server)    
        )
    )    
)


;;PRIVATE FUNCTIONS

;;Calculation of interest based on 5% of stx-deposit times the lockup period
(define-private (calculate-interest)
    (ok
        (begin
            (var-set interest (* (/ (* (var-get stx-deposit) u5) u100) (var-get lockup-period)))
        )
    )
)

;;Transfers from client to escrow stx-deposit
(define-private (transfer-client-to-escrow)
  (begin
    (print (stx-transfer? (var-get stx-deposit) tx-sender escrow))
    (ok (var-get stx-deposit))
  )
)

;;Transfers from server to escrow interest stx
(define-private (transfer-server-to-escrow)
  (begin
    (print (stx-transfer? (var-get interest) server escrow))
    (ok (var-get interest))
  )
)

;;Transfers fee from client to escrow
(define-private (pay-fee)
  (begin
    (print (stx-transfer? (var-get fee) tx-sender escrow))
    (ok (var-get fee))
  )
)

;;Transfer intrest from escrow to client
(define-private (transfer-escrow-to-client)
  (begin
    (as-contract (stx-transfer? (var-get interest) escrow client))
    (ok (var-get interest))
  )
)

;;Transfers stx-deposit and fee from escrow to server
(define-private (transfer-escrow-to-server)
  (begin
    (print (stx-transfer? (+ (var-get stx-deposit) (var-get fee)) escrow server))
    (ok (+ (var-get stx-deposit) (var-get fee)))
  )
)